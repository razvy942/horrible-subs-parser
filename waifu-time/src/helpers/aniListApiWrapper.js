import axios from 'axios';

const url = 'https://graphql.anilist.co';
const options = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

function test() {
  const query = `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search) {
      id
      title {
        romaji
        english
      }
    }
  }
}
`;

  const variables = {
    search: 'Fate/Zeros',
    page: 1,
    perPage: 3
  };

  axios({
    method: 'POST',
    url: url,
    data: JSON.stringify({ query, variables }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then(res => console.log(res.data.data));
}

export default test;
