var React = require('react');
var Repeater = React.createClass({
    render: function () {
        return (
            <div className="repeater" id="myRepeater">
                <div className="repeater-header">
                    <div className="repeater-header-left">
                        <span className="repeater-title">Awesome Repeater</span>
                        <div className="repeater-search">
                            <div className="search input-group">
                                <input type="search" className="form-control" placeholder="Search"/>
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">
                  <span className="glyphicon glyphicon-search"></span>
                  <span className="sr-only">Search</span>
              </button>
            </span>
                            </div>
                        </div>
                    </div>
                    <div className="repeater-header-right">
                        <div className="btn-group selectlist repeater-filters" data-resize="auto">
                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                <span className="selected-label">&nbsp;</span>
                                <span className="caret"></span>
                                <span className="sr-only">Toggle Filters</span>
                            </button>
                            <ul className="dropdown-menu" role="menu">
                                <li data-value="all" data-selected="true"><a href="#">all</a></li>
                                <li data-value="some"><a href="#">some</a></li>
                                <li data-value="others"><a href="#">others</a></li>
                            </ul>
                            <input className="hidden hidden-field" name="filterSelection" readonly="readonly"
                                   aria-hidden="true" type="text"/>
                        </div>
                        <div className="btn-group repeater-views" data-toggle="buttons">
                            <label className="btn btn-default active">
                                <input name="repeaterViews" type="radio" value="list"><span
                                    className="glyphicon glyphicon-list"></span>
                            </label>
                            <label className="btn btn-default">
                                <input name="repeaterViews" type="radio" value="thumbnail"><span
                                    className="glyphicon glyphicon-th"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="repeater-viewport">
                    <div className="repeater-canvas"></div>
                    <div className="loader repeater-loader"></div>
                </div>
                <div className="repeater-footer">
                    <div className="repeater-footer-left">
                        <div className="repeater-itemization">
                            <span><span className="repeater-start"></span> - <span
                                className="repeater-end"></span> of <span
                                className="repeater-count"></span> items</span>
                            <div className="btn-group selectlist" data-resize="auto">
                                <button type="button" className="btn btn-default dropdown-toggle"
                                        data-toggle="dropdown">
                                    <span className="selected-label">&nbsp;</span>
                                    <span className="caret"></span>
                                    <span className="sr-only">Toggle Dropdown</span>
                                </button>
                                <ul className="dropdown-menu" role="menu">
                                    <li data-value="5"><a href="#">5</a></li>
                                    <li data-value="10" data-selected="true"><a href="#">10</a></li>
                                    <li data-value="20"><a href="#">20</a></li>
                                    <li data-value="50" data-foo="bar" data-fizz="buzz"><a href="#">50</a></li>
                                    <li data-value="100"><a href="#">100</a></li>
                                </ul>
                                <input className="hidden hidden-field" name="itemsPerPage" readonly="readonly"
                                       aria-hidden="true" type="text"/>
                            </div>
                            <span>Per Page</span>
                        </div>
                    </div>
                    <div className="repeater-footer-right">
                        <div className="repeater-pagination">
                            <button type="button" className="btn btn-default btn-sm repeater-prev">
                                <span className="glyphicon glyphicon-chevron-left"></span>
                                <span className="sr-only">Previous Page</span>
                            </button>
                            <label className="page-label" id="myPageLabel">Page</label>
                            <div className="repeater-primaryPaging active">
                                <div className="input-group input-append dropdown combobox">
                                    <input type="text" className="form-control" aria-labelledby="myPageLabel">
                                        <div className="input-group-btn">
                                            <button type="button" className="btn btn-default dropdown-toggle"
                                                    data-toggle="dropdown">
                                                <span className="caret"></span>
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-right"></ul>
                                        </div>
                                </div>
                            </div>
                            <input type="text" className="form-control repeater-secondaryPaging"
                                   aria-labelledby="myPageLabel">
                                <span>of <span className="repeater-pages"></span></span>
                                <button type="button" className="btn btn-default btn-sm repeater-next">
                                    <span className="glyphicon glyphicon-chevron-right"></span>
                                    <span className="sr-only">Next Page</span>
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
        }
        });

        module.exports = Repeater;


