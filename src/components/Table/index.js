import React from "react";
import API from "../../utils/API"

class Table extends React.Component {
    state = {
        filter: false,
        sort: false,
        userdata: []
    }

    componentDidMount() {
        this.retrieveUsers()
      }

    retrieveUsers = () => {
        API.search()
        .then(response => this.setState({...this.state, userdata: response.data.results}))
        .then(() => console.log(this.state))
    }

    iterator = (array) => {
        let result = []

        //if state.filter is true, run the filter function which includes only women
        if (this.state.filter) {
            array = array.filter(person => person.gender === "female")
        }

        //if state.sort is true, run the sort function which sorts by last name
        if (this.state.sort) {
            function compare(a, b) {
                if (a.name.last > b.name.last) return 1;
                if (b.name.last > a.name.last) return -1;
              
                return 0;
            }

            array = array.sort(compare)
        }

        for (let i of array) {
            result.push(
            <tr>
                <td>{i.name.first}</td>
                <td>{i.name.last}</td>
                <td>{i.gender}</td>
                <td>{i.email}</td>
                <td>{i.phone}</td>
            </tr>)

        }
        return result
    }

    handleFilter = () => {
        this.setState({...this.state, filter: true})
    }

    handleSort = () => {
        this.setState({...this.state, sort: true})
    }

    handleOriginal = () => {
        this.setState({...this.state, filter: false, sort: false})
        console.log(this.state)
    }
    
    render() {
        return (
            <div>
                <table>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                    {this.iterator(this.state.userdata)}
                </table>

                <button onClick={this.handleFilter}>FILTER</button>
                <button onClick={this.handleSort}>SORT</button>
                <button onClick={this.handleOriginal}>ORIGINAL</button>
            </div>
        )
    }
}

export default Table;