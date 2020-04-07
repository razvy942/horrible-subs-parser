import path from 'path';
import React from 'react';
import { ReactMPV } from 'mpv.js';
import { remote } from 'electron';
import classes from './Renderer.module.css';
// import ReactMPV from './helpers/NewMPV'asd;
import { withRouter } from 'react-router-dom';

class Renderer extends React.PureComponent {
  mpv = null;
  state = { pause: true, 'time-pos': 0, duration: 0, fullscreen: false };
  handleKeyDown = this.handleKeyDown.bind(this);
  handleMPVReady = this.handleMPVReady.bind(this);
  handlePropertyChange = this.handlePropertyChange.bind(this);
  toggleFullscreen = this.toggleFullscreen.bind(this);
  togglePause = this.togglePause.bind(this);
  handleStop = this.handleStop.bind(this);
  handleSeek = this.handleSeek.bind(this);
  handleSeekMouseDown = this.handleSeekMouseDown.bind(this);
  handleSeekMouseUp = this.handleSeekMouseUp.bind(this);
  handleLoad = this.handleLoad.bind(this);

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
    console.log(path.join(__dirname, '.'));
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  handleKeyDown(e) {
    e.preventDefault();
    if (e.key === 'f' || (e.key === 'Escape' && this.state.fullscreen)) {
      this.toggleFullscreen();
    } else if (this.state.duration) {
      this.mpv.keypress(e);
    }
  }

  handleMPVReady(mpv) {
    this.mpv = mpv;
    const observe = mpv.observe.bind(mpv);
    ['pause', 'time-pos', 'duration', 'eof-reached'].forEach(observe);
    this.mpv.property('hwdec', 'auto');
    //this.mpv.command('loadfile', '.\\vid.mkv');
    let vidPath = '\\vid.mkv';
    if (this.props.location.state) {
      vidPath = this.props.location.state.path;
    }
    this.mpv.command('loadfile', vidPath);
  }

  handlePropertyChange(name, value) {
    if (name === 'time-pos' && this.seeking) {
      return;
    } else if (name === 'eof-reached' && value) {
      this.mpv.property('time-pos', 0);
    } else {
      this.setState({ [name]: value });
    }
  }

  toggleFullscreen() {
    if (this.state.fullscreen) {
      document.webkitExitFullscreen();
    } else {
      this.mpv.fullscreen();
    }
    this.setState({ fullscreen: !this.state.fullscreen });
  }

  togglePause(e) {
    e.target.blur();
    if (!this.state.duration) return;
    this.mpv.property('pause', !this.state.pause);
  }
  handleStop(e) {
    e.target.blur();
    this.mpv.property('pause', true);
    this.mpv.command('stop');
    this.setState({ 'time-pos': 0, duration: 0 });
  }
  handleSeekMouseDown() {
    this.seeking = true;
  }
  handleSeek(e) {
    e.target.blur();
    const timePos = +e.target.value;
    this.setState({ 'time-pos': timePos });
    this.mpv.property('time-pos', timePos);
  }
  handleSeekMouseUp() {
    this.seeking = false;
  }
  handleLoad(e) {
    e.target.blur();
    remote.dialog
      .showOpenDialog({
        filters: [
          { name: 'Videos', extensions: ['mkv', 'webm', 'mp4', 'mov', 'avi'] },
          { name: 'All files', extensions: ['*'] },
        ],
      })
      .then((res) => {
        if (res.filePaths[0]) this.mpv.command('loadfile', res.filePaths[0]);
      });
  }

  render() {
    return (
      <div className={classes.container}>
        <ReactMPV
          className={classes.player}
          onReady={this.handleMPVReady}
          onPropertyChange={this.handlePropertyChange}
          onMouseDown={this.togglePause}
        />
        <div className={classes.controls}>
          <button className={classes.control} onClick={this.togglePause}>
            {this.state.pause ? '▶' : '❚❚'}
          </button>
          <button className={classes.control} onClick={this.handleStop}>
            ■
          </button>
          <input
            className={classes.seek}
            type="range"
            min={0}
            step={0.1}
            max={this.state.duration}
            value={this.state['time-pos']}
            onChange={this.handleSeek}
            onMouseDown={this.handleSeekMouseDown}
            onMouseUp={this.handleSeekMouseUp}
          />
          <button className={classes.control} onClick={this.handleLoad}>
            ⏏
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Renderer);
