import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form'; 
//below, Task 1, Point 4, Open Circle 1/3,  all places with new addition of fetchPartners ... use the new fetchPartners action creator in the correct places ... Open Circle 2/3 ... update the way that the partners data is passed to the Home component ... Open Circle 3/3 ... pass the isLoading and errMess properties of the partners object to the Home component. 
    // below is Task 2/3 Point 2/4, Bullet 1/3


import { postComment, fetchCampsites, fetchComments, fetchPromotions, fetchPartners, postFeedback } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';



const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};


const mapDispatchToProps = {
    addComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions()),
    fetchPartners: () => (fetchPartners()),
        // below is Task 2/3 Point 2/4, Bullet 2/3

    postFeedback: (feedback) => (postFeedback(feedback))
};

class Main extends Component {
  /*  constructor(props) {
        super(props);
        this.props = {
            campsites: CAMPSITES,
            comments: COMMENTS,
            partners: PARTNERS,
            promotions: PROMOTIONS

        };
    }

    */
   componentDidMount() {
    this.props.fetchCampsites();
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchPartners();
}


render() {

    const HomePage = () => {
        return (
            <Home
            campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
            campsitesLoading={this.props.campsites.isLoading}
            campsitesErrMess={this.props.campsites.errMess}
            promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
            promotionLoading={this.props.promotions.isLoading}
            promotionErrMess={this.props.promotions.errMess}
            partner={this.props.partners.partners.filter(partner => partner.featured)[0]}
            partnersLoading = {this.props.partners.isLoading}
            partnersErrMess = {this.props.partners.erMess}
        />
        );
    }

    const CampsiteWithId = ({match}) => {
        return (
            <CampsiteInfo 
            campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
            isLoading={this.props.campsites.isLoading}
            errMess={this.props.campsites.errMess}
            comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
        />
        );
    };
// below is Task 2/3 Point 2/4, Bullet 3/3 ... Pass postFeedback to the Contact component from a Route component, where you are currently only passing the resetFeedbackForm prop. 
        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                            <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                           <Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} /> } />
                            <Route exact path='/aboutus' render={() => <About partners={this.props.partners} /> } />
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));


// As with all other assignments, 99.999% of this work came directly from Instructor HE and also Nucamp tutorials... In particular with this assignment, student author (that's me, Franklin Bueno) worked from the collaboration with fellow students DM and AP and also worked from the suggestions of Instructor HE... Also, Instructor HE bailed out the student author and had the student author change this.props.partners to this.state.partners in line 66 in the MainComponent file...


// ATTENTION/ALERT - for week five assignment, student author (me, Franklin Bueno), borrowed VERY HEAVILY from the screenshots and slack messages from extremely helpful Instructor HE and also boot camp classmates...