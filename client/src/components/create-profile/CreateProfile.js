import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInput: false,
            handle: '',
            company: '',
            webiste: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {

            }
        }
    }
    render() {
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                <p className="lead text-center">
                                Let's get some information to make your profile stand out.
                                </p>
                                <small className="d-block pb-3">
                                *= required fields
                                </small>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}
const mapStatetoProps = state => ({
    profile: state.profile,
    errors: state.errors,
})
export default connect(null)(CreateProfile)