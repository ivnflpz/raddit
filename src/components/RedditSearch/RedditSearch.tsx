import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { InputGroup, Dropdown, DropdownButton, FormControl, ButtonToolbar } from 'react-bootstrap';

import './RedditSearch.scss';

import redditApi from '../../services/RedditApi';
import { SortCategory } from '../../models/SortCategory';
import { TimeCategory } from '../../models/TimeCategory';
import { SortOption, SortOptions } from '../../models/SortOptions';

interface RedditSearchState {
    query: string;
    sort: SortCategory;
    sortOptions: any;
    hasResults: boolean;
}
class RedditSearch extends React.Component<{handleResults: Function}, RedditSearchState> {
    constructor(props: any) {
        super(props);

        this.state = {
            query: '',
            sort: SortCategory.Top,
            sortOptions: Object.assign({}, SortOptions),
            hasResults: false
        }
    }

    search() {
        if (this.state.query.trim() === "") {
            return;
        }
        const options: SortOption = this.state.sortOptions[this.state.sort];
        redditApi.search(this.state.query, options).then((results: any) => {
            this.setState({hasResults: true})
            this.props.handleResults(results);
        });
    }

    updateQueryValue(evt: any) {
        this.setState({query: evt.target.value});
    }

    keyPressed(evt: any) {
        if (evt.key === "Enter") {
            this.search();
        }
    }

    handleSortSelect(evt: any) {
        this.setState({sort: evt}, this.search);
    }

    handleTimeSelect(evt: any) {
        const sort = this.state.sort;
        let sortOptions = Object.assign({},this.state.sortOptions);
        sortOptions[sort].time = evt;
        this.setState({sortOptions: sortOptions}, this.search);
    }

    renderTimeOptions() {
        const sort = this.state.sort;
        const options: SortOption = this.state.sortOptions[sort];
        if (options.timeSupported) {
            return (
                <DropdownButton title={options.time} id="time-dropdown" onSelect={(evt: any) => this.handleTimeSelect(evt)}>
                    <Dropdown.Item eventKey={TimeCategory.Hour}>Past Hour</Dropdown.Item>
                    <Dropdown.Item eventKey={TimeCategory.Day}>Past 24 Hours</Dropdown.Item>
                    <Dropdown.Item eventKey={TimeCategory.Week}>Past Week</Dropdown.Item>
                    <Dropdown.Item eventKey={TimeCategory.Month}>Past Month</Dropdown.Item>
                    <Dropdown.Item eventKey={TimeCategory.Year}>Past Year</Dropdown.Item>
                    <Dropdown.Item eventKey={TimeCategory.All}>Of All Time</Dropdown.Item>
                </DropdownButton>
            )
        }
        return "";
    }

    renderSortOptions() {
        if (!this.state.hasResults) {
            return "";
        }
        return (
            <ButtonToolbar>
                <DropdownButton title={'Sort ' + this.state.sort} id="sort-dropdown" onSelect={(evt: any) => this.handleSortSelect(evt)}>
                    {Object.keys(this.state.sortOptions).map((k: string) => <Dropdown.Item key={k} eventKey={k}>{k}</Dropdown.Item>)}
                </DropdownButton>

                {this.renderTimeOptions()}
            </ButtonToolbar>
        )
    }

    render() {
        return (
            <div>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text><FontAwesomeIcon icon="search"></FontAwesomeIcon></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder="Search raddit" aria-label="Search raddit" aria-describedby="basic-addon2" 
                        value={this.state.query} 
                        onChange={(evt: any) => this.updateQueryValue(evt)} 
                        onKeyPress={(evt: any) => this.keyPressed(evt)} />
                </InputGroup>
                {this.renderSortOptions()}
            </div>
        );
    }
}
 
export default RedditSearch;