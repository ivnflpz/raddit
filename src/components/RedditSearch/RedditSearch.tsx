import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputGroup, Dropdown, DropdownButton, FormControl, Navbar, Spinner } from 'react-bootstrap';

import './RedditSearch.scss';

import { RedditHandler } from '../../services/RedditApi';
import { SortCategory, SortOption, SortOptions, TimeCategory, TimeOptions } from '../../models';

interface RedditSearchState {
    query: string;
    sort: SortCategory;
    sortOptions: any;
    hasResults: boolean;
    loading: boolean;
}
class RedditSearch extends React.Component<{handleResults: Function}, RedditSearchState> {
    private redditHandler: RedditHandler;
    constructor(props: any) {
        super(props);

        this.state = {
            query: '',
            sort: SortCategory.Top,
            sortOptions: Object.assign({}, SortOptions),
            hasResults: false,
            loading: false
        }

        this.redditHandler = RedditHandler.getInstance();
    }

    search() {
        if (this.state.query.trim() === "") {
            return;
        }
        const options: SortOption = this.state.sortOptions[this.state.sort];
        this.redditHandler.search(this.state.query, options).then((results: any) => {
            this.setState({hasResults: true, loading: false}, () => {
                this.props.handleResults(results);
            });
        });
    }

    updateQueryValue(evt: any) {
        this.setState({query: evt.target.value});
    }

    keyPressed(evt: any) {
        if (evt.key === "Enter") {
            this.setState({loading: true}, this.search);
        }
    }

    handleSortSelect(evt: any) {
        this.setState({sort: evt, loading: true}, this.search);
    }

    handleTimeSelect(evt: any) {
        const sort = this.state.sort;
        let sortOptions = Object.assign({},this.state.sortOptions);
        sortOptions[sort].time = evt;
        this.setState({sortOptions: sortOptions, loading: true}, this.search);
    }

    renderTimeOptions() {
        const options: SortOption = this.state.sortOptions[this.state.sort];

        if (!this.state.hasResults || !options.timeSupported) {
            return "";
        }
        const items = Object.keys(TimeOptions).map((key: string) => {
            const cat = key as TimeCategory;
            return <Dropdown.Item variant="outline-secondary" key={cat} eventKey={cat} active={options.time === cat}>
                {TimeOptions[cat].description}
            </Dropdown.Item>
        })
        return (
            <DropdownButton as={InputGroup.Append} 
                variant="outline-secondary" 
                title={TimeOptions[options.time as TimeCategory].description} 
                id="time-dropdown" 
                onSelect={(evt: any) => this.handleTimeSelect(evt)}>
                {items}
            </DropdownButton>
        )
    }

    renderSortOptions() {
        if (!this.state.hasResults) {
            return "";
        }
        return (
            <DropdownButton as={InputGroup.Append} variant="outline-secondary" title={'Sort ' + this.state.sort} id="sort-dropdown" onSelect={(evt: any) => this.handleSortSelect(evt)}>
                {Object.keys(this.state.sortOptions).map((key: string) => 
                    <Dropdown.Item key={key} eventKey={key} active={this.state.sort === key}>
                        <FontAwesomeIcon icon={SortOptions[key as SortCategory].icon}></FontAwesomeIcon>
                        {key}
                    </Dropdown.Item>
                )}
            </DropdownButton>
        )
    }

    render() {
        const prependIcon = this.state.loading
            ? <Spinner animation="grow" size="sm" />
            : <FontAwesomeIcon icon="search" />
        return (
            <Navbar bg="light" variant="light" fixed="top">
            
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                            {prependIcon}
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder="Search raddit" aria-label="Search raddit" aria-describedby="basic-addon2" 
                        value={this.state.query} 
                        onChange={(evt: any) => this.updateQueryValue(evt)} 
                        onKeyPress={(evt: any) => this.keyPressed(evt)} />
                    {this.renderSortOptions()}
                    {this.renderTimeOptions()}
                </InputGroup>
            </Navbar>
        );
    }
}
 
export default RedditSearch;