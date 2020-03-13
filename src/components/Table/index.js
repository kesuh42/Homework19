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
        .then(response => this.setState({filter: false, sort: false, userdata: response.data.results}))
        .then(() => console.log(this.state))
    }

    iterator = (array) => {
        let result = []
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
    
    render() {
        return (
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



            // <div> {this.iterator(this.state.userdata)}
            // </div>
        )
    }
}

export default Table;