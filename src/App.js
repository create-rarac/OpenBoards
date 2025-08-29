import React from 'react';
import './App.css';
import ForumHeader from './components/ForumHeader';
import AuthBox from './components/AuthBox';
import CategoryBar from './components/CategoryBar';
import ThreadTable from './components/ThreadTable';
import ThreadView from './components/ThreadView';

function App() {
    return (
        <div className="App">
            <ForumHeader />
            <AuthBox />
            <CategoryBar />
            <ThreadTable />
            <ThreadView />
        </div>
    );
}

export default App;