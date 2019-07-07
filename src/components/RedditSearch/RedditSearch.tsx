import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { InputGroup, Dropdown, DropdownButton, FormControl } from 'react-bootstrap';

import './RedditSearch.scss';

import redditApi from '../../services/RedditApi';
import { SortCategory } from '../../models/SortCategory';

interface RedditSearchState {
    query: string;
    sort: SortCategory;
}
class RedditSearch extends React.Component<{handleResults: Function}, RedditSearchState> {
    constructor(props: any) {
        super(props);

        this.state = {
            query: '',
            sort: SortCategory.Top
        }
    }

    search(query: string, sort: SortCategory) {
        redditApi.search(query, sort).then((results: any) => {
            this.props.handleResults(results);
        });
    }

    updateQueryValue(evt: any) {
        this.setState({query: evt.target.value});
    }

    keyPressed(evt: any) {
        if (evt.key === "Enter") {
            this.search(this.state.query, this.state.sort);
        }
    }

    handleSelect(evt: any) {
        this.setState({sort: evt}, () => {
            this.search(this.state.query, this.state.sort);
        });
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
                <DropdownButton as={InputGroup.Append} title={'Sort ' + this.state.sort} id="input-group-dropdown-2" onSelect={(evt: any) => this.handleSelect(evt)}>
                    <Dropdown.Item eventKey={SortCategory.Hot}>Hot</Dropdown.Item>
                    <Dropdown.Item eventKey={SortCategory.New}>New</Dropdown.Item>
                    <Dropdown.Item eventKey={SortCategory.Controversial}>Controversial</Dropdown.Item>
                    <Dropdown.Item eventKey={SortCategory.Top}>Top</Dropdown.Item>
                    <Dropdown.Item eventKey={SortCategory.Rising}>Rising</Dropdown.Item>
                </DropdownButton>
            </div>
        );
    }
}

export default RedditSearch;