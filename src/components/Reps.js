import React from 'react'
import { Query } from 'react-apollo'
import { repsQuery } from '../data/query'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { SearchBar } from "./SearchBar"


const columns = [{
  Header: 'Name',
  id: 'name',
  width: Math.round(window.innerWidth * 0.2),
  accessor: ({node}) => (<a href={node.url}>{node.name}</a>)
},
  {
    Header: 'Owner',
    id: 'owner',
    width: Math.round(window.innerWidth * 0.2),
    accessor: 'node.owner.login'
  },
  {
    Header: 'Description',
    id: 'description',
    accessor: 'node.description'
  }
];

export class Reps extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      pageSize: 10,
      pageIndex: 0,
      query: "is:public",
      searchActive: false,
    };

    this.handleSearch = this.handleSearch.bind(this);

  };

  handleSearch(event) {
    let value =  event.target.search.value;
    if (value) {
      this.setState({query: value, searchActive: true});
    } else {
      this.setState({query: "is:public", searchActive: false});
    }
    event.preventDefault();
  };

  render () {
    const query = this.state.query;
    const first = this.state.pageSize;
    return (
      <>
        <SearchBar submit={this.handleSearch}/>
        <Query
          query={repsQuery}
          variables={{
            query,
            first
          }}
        >
          {({ loading, error, data, fetchMore }) => {
            if (loading) return <p>Loading...</p>;
            if (error) {
              console.log(error);
              return <p>Error :(</p>;
            }

            const search = data.search;

            return (
              <ReactTable
                manual
                data={search.edges}
                columns={columns}
                pages={Math.round(search.repositoryCount/this.state.pageSize)}
                defaultPageSize={this.state.pageSize}
                showPageJump={false}
                showPagination={this.state.searchActive}
                showPageSizeOptions={false}
                className="-striped -highlight"
                onPageChange={(pageNumber) => {
                  let after, first, before, last;
                  if ( this.state.pageIndex < pageNumber ) {
                    after = search.pageInfo.endCursor;
                    first = this.state.pageSize;
                  } else {
                    before = search.pageInfo.startCursor;
                    last = this.state.pageSize;
                  }
                  this.setState({pageIndex: pageNumber});
                  fetchMore({
                    variables: {
                      query,
                      first,
                      last,
                      after,
                      before
                    },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                      const search = fetchMoreResult.search;
                      return { search };
                    }
                  })
                }
                }
              />
            );

          }}
        </Query>
      </>
    )
  }
};
