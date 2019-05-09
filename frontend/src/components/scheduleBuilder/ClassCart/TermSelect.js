import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Form,
    FormGroup,
    Input, Label,
} from 'reactstrap';
import axios from "axios";
import getAuthToken from "../../../userLib/getAuthToken";

export default class TermSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {terms:[]};
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(e){
        this.props.handleChosenTermChange(e);
        //Clear out courses in the schedule grid
        // this.props.setCoursesSelected([]);
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL + "/api/terms/")
            .then(res => {
                this.setState({terms:res.data.results,});
                const previousLoadedTerm = localStorage.getItem("chosenTerm");

                //Set the chosen term to the first loaded one
                console.log(previousLoadedTerm);
                if (previousLoadedTerm === null){
                    this.props.setChosenTerm(this.state.terms[0].id);
                }
                else{
                    this.props.setChosenTerm(previousLoadedTerm);
                }
            });
    }

    render(){
        let termOptions;
		if (this.state.terms) {
			termOptions = this.state.terms.map((term) =>
				<option value={term.id} key={term.id}>{term.title}</option>
			);
		}

        return (
            <Card>
                <CardHeader><h5>Select Term:</h5></CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            {/*<Label for="termSelect">Term</Label>*/}
                            <Input type="select" name="term" id="termSelect" onChange={this.handleOnChange} value={this.props.chosenTerm}>
                                {termOptions}
                            </Input>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        );
    }
}