import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import Dialog, {
  DialogContent,
  withMobileDialog,
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';

import { toggleNote, getNoteById, getNoteByIdFailed } from '../NoteActions';

const styles = theme => ({
  appBar: {
    boxShadow: theme.shadows[1]
  },
  menuButton: {
    marginLeft: -12,
    color: '#000',
  },
  dialogContent: {
    paddingTop: 20,
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
  },
  date: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  note: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  toggleNote: PropTypes.func.isRequired,
  getNoteById: PropTypes.func.isRequired,
  getNoteByIdFailed: PropTypes.func.isRequired,
};

class NoteDetail extends Component {
  componentWillMount() {
    this.props.getNoteById(this.props.match.params.id);
    this.props.toggleNote(this.props.note.color);
  }

  handleClose = () => {
    this.props.close();
    this.props.toggleNote();
  };

  render() {
    const { fullScreen, classes } = this.props;
    const { item, isLoading, failed } = this.props.note;

    if (failed) {
      this.props.getNoteByIdFailed(false);
    }
    
    return (
      <Route
        path="/notes/:id"
        render={() => (
          !failed
          ? <div>
              {
                !isLoading &&
                <Dialog
                  fullScreen={fullScreen}
                  open
                  onClose={this.handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <Hidden mdUp>
                    <AppBar
                      className={classes.appBar}
                      style={{ background: item.color }}
                      position="static"
                    >
                      <Toolbar>
                        <IconButton
                          className={classes.menuButton}
                          aria-label="Menu"
                          onClick={this.handleClose}
                        >
                          <ArrowBackIcon />
                        </IconButton>
                      </Toolbar>
                    </AppBar>
                  </Hidden>
                  <DialogContent
                    className={classes.dialogContent}
                    style={{ background: item.color }}
                  >
                    <Typography
                      variant="display2"
                      gutterBottom
                    >
                      {item.title}
                    </Typography>
                    <Typography gutterBottom>
                      {item.text}
                    </Typography>
                    {
                      item.collabs &&
                      item.collabs.map(collab => (
                        <div key={collab.author}>
                          <Divider
                            className={classes.divider}
                          />
                          <Typography
                            variant="body2"
                            gutterBottom
                          >
                            {collab.author}
                          </Typography>
                          <Typography className={classes.date}>
                            Created at: January 23, 2018 11:32 AM
                          </Typography>
                          <Typography
                            gutterBottom
                            className={classes.date}
                          >
                            Last Update: February 03, 2018 3:58 PM
                          </Typography>
                          <Typography gutterBottom>
                            {collab.text}
                          </Typography>
                        </div>
                      ))
                    }
                  </DialogContent>
                </Dialog>
              }
            </div>
          : <Redirect
              to={{
                pathname: '/notes'
              }}
            />
        )}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  note: state.note,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  close: () => push('/notes'),
  toggleNote,
  getNoteById,
  getNoteByIdFailed
}, dispatch);

NoteDetail.propTypes = propTypes;
NoteDetail = withMobileDialog()(NoteDetail);
NoteDetail = withStyles(styles)(NoteDetail);
NoteDetail = connect(mapStateToProps, mapDispatchToProps)(NoteDetail);

export default NoteDetail;