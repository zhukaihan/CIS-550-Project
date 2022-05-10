import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";

import {
    Table,
    //Pagination,
    Select,
    Row,
    Col,
    Divider,
    Tag
} from 'antd'
import { RadarChart } from 'react-vis';
import { format } from 'd3-format';




import { getTweetsSearch } from '../../fetcher'
import Column from 'antd/lib/table/Column';


class Tweets extends React.Component {
    constructor(props) {
        super(props)
        const searchParams = new URLSearchParams(window.location.search);
        this.state = {
            userName:  searchParams.has("username") ? searchParams.get("username") : "",//window.location.search ? window.location.search.substring(1).split('=')[1]:'',
            startDate: '2021-02-08',
            endDate: '2021-02-10',
            tweetsResults: [],
        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleStartDateQueryChange = this.handleStartDateQueryChange.bind(this)
        this.handleEndDateQueryChange = this.handleEndDateQueryChange.bind(this)
        this.handleUserNameQueryChange = this.handleUserNameQueryChange.bind(this)
        this.makeTag = this.makeTag.bind(this)
    }
    makeTag(num) {
        if (num == 0) {
            return <div/>

        } else if (num == 1) {
            
            return <div>
                <Tag color="blue" key={"Crypto"}>
                    Crypto
                </Tag>
                
            </div>

        } else if (num == 2) {
            return <div>
                <Tag color="red" key={"Ethereum"}>
                Ethereum
                </Tag>
            </div>

        } else if (num == 3) {
            return <div>
                <Tag color="blue" key={"Crypto"}>
                    Crypto
                </Tag>
                <Tag color="red" key={"Ethereum"}>
                Ethereum
                </Tag>
            </div>

        } else if (num == 4) {
            return <div>
                <Tag color="green" key={"Bitcoin"}>
                Bitcoin
                </Tag>
            </div>

        } else if (num == 5) {
            return <div>
                <Tag color="green" key={"Bitcoin"}>
                Bitcoin
                </Tag>
                <Tag color="blue" key={"Crypto"}>
                    Crypto
                </Tag>
            </div>

        } else if (num == 6) {
            return <div>
                <Tag color="green" key={"Bitcoin"}>
                Bitcoin
                </Tag>
                <Tag color="red" key={"Ethereum"}>
                Ethereum
                </Tag>
            </div>

        } else {
            return <div>
                <Tag color="green" key={"Bitcoin"}>
                Bitcoin
                </Tag>
                <Tag color="red" key={"Ethereum"}>
                Ethereum
                </Tag>
                <Tag color="blue" key={"Crypto"}>
                    Crypto
                </Tag>
            </div>

        }
    }


    handleStartDateQueryChange(event) {
        this.setState({ startDate: event.target.value })
    }

    handleEndDateQueryChange(event) {
        this.setState({ endDate: event.target.value })
    }

    handleUserNameQueryChange(event) {
        this.setState({ userName: event.target.value })
    }


    updateSearchResults() {
        getTweetsSearch(this.state.userName, this.state.startDate, this.state.endDate).then(res => {
            console.log(res.results)
            this.setState({ tweetsResults: res.results })
        })

    }

    componentDidMount() {
        getTweetsSearch(this.state.userName, this.state.startDate, this.state.endDate).then(res => {
            this.setState({ tweetsResults: res.results })
        })
    }



    render() {

        return (

            <div>

                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>User Name</label>
                            <FormInput placeholder="User Name" value={this.state.userName} onChange={this.handleUserNameQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Start Date</label>
                            <FormInput placeholder="Start Date" value={this.state.startDate} onChange={this.handleStartDateQueryChange} />
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>End Date</label>
                            <FormInput placeholder="End Date" value={this.state.endDate} onChange={this.handleEndDateQueryChange} />
                        </FormGroup></Col>
                    </Row>
                    <Col flex={2}><FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                        <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                    </FormGroup></Col>
                    <br></br>


                </Form>
                <Divider />

                <Table style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }} onRow={(record, rowIndex) => {
                    return {
                        onClick: e => {
                            window.location = `/User?username=${record.user_name}`;
                            console.log(record)
                        },
                    };
                }} dataSource={this.state.tweetsResults} pagination={{ pageSizeOptions: [5, 10], defaultPageSize: 5, showQuickJumper: true }}>
                    <Col title="Date" dataIndex="date" key="Date" sorter={(a, b) => a.date.localeCompare(b.date)} />
                    <Col title="User" dataIndex="user_name" key="user_name" />
                    <Col title="Tweet" dataIndex="text" key="text" />
                    <Column title="Tags" dataIndex="htg" key="htg" render={
                        tag => this.makeTag(tag)}
                    />
                </Table>

            </div>
        )
    }
}

export default Tweets;

