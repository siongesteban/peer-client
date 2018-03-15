import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import NoteDialog from './NoteDialog';

import { updateThemeColor } from '../../Layout/LayoutUtils';

const styles = theme => ({
  
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};

class NoteCreate extends Component {
  componentDidMount() {
    updateThemeColor('#fff');
  }

  handleClose = () => {
    this.props.close();
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <NoteDialog
          handleClose={this.handleClose}
          title={'Create Note'}
          noteColor={'#fff'}
        >
          <Typography
            variant="display2"
            gutterBottom
          >
            Put form here
          </Typography>
        </NoteDialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  close: () => push('/notes'),
}, dispatch);

NoteCreate.propTypes = propTypes;
NoteCreate = withStyles(styles)(NoteCreate);
NoteCreate = connect(null, mapDispatchToProps)(NoteCreate);

export default NoteCreate;