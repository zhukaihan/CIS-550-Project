import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    //Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate,
    DatePicker 
} from 'antd'
import { RadarChart } from 'react-vis';
import { format } from 'd3-format';




import {getUsersSearch}  from '../../fetcher'
const wideFormat = format('.3r');

const tweetsColumns = [
    {
        title: 'Date',
        dataIndex: 'Date',
        key: 'Date',
        sorter: (a, b) => a.Date.localeCompare(b.Date),
        //render: (text, row) => <a href={`/Tweets?startDate=${row.startDate}&endDate==${row.endDate}`}>{text}</a>
    },
    {
        title: 'Nationality',
        dataIndex: 'Nationality',
        key: 'Nationality',
        sorter: (a, b) => a.Nationality.localeCompare(b.Nationality)
    },
    {
        title: 'Rating',
        dataIndex: 'Rating',
        key: 'Rating',
        sorter: (a, b) => a.Rating - b.Rating

    },
    // TASK 19: copy over your answers for tasks 7 - 9 to add columns for potential, club, and value
    // TASK 7: add a column for Potential, with the ability to (numerically) sort ,
    {
        title: 'Potential',
        dataIndex: 'Potential',
        key: 'Potential',
        sorter: (a, b) => a.Potential - b.Potential
        
    },
    // TASK 8: add a column for Club, with the ability to (alphabetically) sort 
    {
        title: 'Club',
        dataIndex: 'Club',
        key: 'Club',
        sorter: (a, b) => a.Club.localeCompare(b.Club)
        
    },
    // TASK 9: add a column for Value - no sorting required
    {
        title: 'Value',
        dataIndex: 'Value',
        key: 'Value'
    },
];


class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: window.location.search ? window.location.search.substring(1).split('=')[1]:'',
            userResults: [],
        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleUserNameQueryChange = this.handleUserNameQueryChange.bind(this)
    }


    handleUserNameQueryChange(event) {
        this.setState({ userName: event.target.value })
    }

    updateSearchResults() {
        getUsersSearch(this.state.userName).then(res => {
            this.setState({ userResults: res.results })
            console.log(res)
        })
    }

    componentDidMount() {

        getUsersSearch(this.state.userName).then(res => {
            this.setState({ userResults: res.results })
        })
    }

    render() {
        return (

            <div>

                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '15vw', margin: '0 auto' }}>
                            <label>Username</label>
                            <FormInput placeholder="User Name" value={this.state.userName} onChange={this.handleUserNameQueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <Col flex={2}><FormGroup style={{ width: '10vw', margin: '0 auto'  }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                    </FormGroup></Col>
                    <br></br>


                </Form>
                <Divider />

                <Table style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }} onRow={(record, rowIndex) => {
                    return {
                        onClick: e => {window.location = `/Tweets?username=${record.user_name}`},
                    };
                }} dataSource={this.state.userResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                    <Col title="Username" dataIndex="user_name" key="user_name" sorter = {(a, b) => a.Date.localeCompare(b.Date)}/> 
                    <Col title="User Location" dataIndex="user_location" key="user_location" />
                    <Col title="User Created" dataIndex="user_created" key="user_created" />
                    <Col title="User Followers" dataIndex="user_followers" key="user_followers" />
                    <Col title="User Friends" dataIndex="user_friends" key="user_friends" />
                    <Col title="User Favorites" dataIndex="user_favourites" key="user_favourites" />
                    <Col title="UserVerified" dataIndex="user_verified" key="user_verified"/>
                </Table>

            </div>
        )
    }
}

export default User;

