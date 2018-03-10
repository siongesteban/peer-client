import React from 'react';
import { Route } from 'react-router-dom';

import NoteList from './components/NoteList';

const Note = () => <Route path="/notes" component={NoteList} />;

export default Note;