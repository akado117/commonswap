import React from 'react';
import { Bert } from 'meteor/themeteorchef:bert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { defaultImageUrls } from '../../../../imports/lib/Constants';

class ConnectedButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    componentDidUpdate(prevProps) {
        const { service, actionType, successText } = this.props;
        if (!successText) return;
        if (prevProps.service[actionType] && !service[actionType] && this.state.loading) {
            Bert.alert(successText, 'success', 'growl-top-left');
            this.setLoadingFalse();
        }
    }

    setLoadingFalse = () => this.setState({ loading: false });

    onClickHandler = (e) => {
        this.props.onClick(e);
        if (this.props.successText) this.setState({ loading: true });
    }

    render() {
        const { icon, service, actionType, className, buttonText, disabled } = this.props;
        const component = service[actionType] ?
            <img src={defaultImageUrls.assets.loadingSpinner} className="loading-gif" alt='processing' /> : icon || '';
        return (
            <button
                className={`waves-effect waves-light btn-large connected-button-container ${className}`}
                onClick={this.onClickHandler}
                disabled={disabled}
            >
                <div className={`background-highlight ${!icon ? 'full-width' : ''}`}>
                    {component ?
                        <div className="icon-container">
                            {component}
                        </div> : ''}
                    {icon || (!icon && !component) ?
                        <div className="text-container">
                            {buttonText}
                        </div> : ''}
                </div>
            </button>
        );
    }
}

ConnectedButton.propTypes = {
    icon: PropTypes.element,
    service: PropTypes.object.isRequired,
    actionType: PropTypes.string.isRequired,
    className: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    successText: PropTypes.string,
};

ConnectedButton.defaultProps = {
    icon: undefined,
    className: '',
    disabled: false,
    successText: '',
};

function mapStateToProps(state) {
    const { service } = state;
    return {
        service,
    };
}

export default connect(mapStateToProps)(ConnectedButton);