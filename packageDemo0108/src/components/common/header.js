"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Header = React.createClass({

    render: function () {
        return (
            <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <a className="navbar-brand" href="#">CMS DEMO</a>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="scheduler">scheduler</Link>
                            </li>
                            <li>
                                <Link to="editor">editor</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Header;


/*
 <Link to ="app" className="nav-brand"><img src ="images/logo.png"/>
 </Link>
 <ul>
 <li><Link to="app">home</Link></li>
 <li><Link to="authors">home</Link></li>
 </ul>
 */