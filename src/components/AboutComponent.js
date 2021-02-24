/*

Task 1/3, Point 7/7
Import baseUrl from the shared folder, as you have done previously in HomeComponent.js. ...
In the RenderPartner component, update the src attribute for the Media object to use the baseUrl. Again, the HomeComponent.js module will provide you with an example of how to do this. ...
Create a new functional component named PartnerList that takes props as its argument. Take the declaration of const partners from the top of the About component and move it into this component.
Under this, write an if statement to handle if there was an error message while trying to load. This should return a div with the className of "col". Inside this div should be an h4 element that contains the error message.


*/

import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';




    // Task 2/3, Point 1/4  Below... Also, Task 2/3, Point 2/4
    // Task 2/3 Point 3/4 Below...
    function RenderPartner({ partner }){
        if (partner) {
            return(
                    <React.Fragment>
                    {/*    <Media object src={partner.image} alt={partner.name} width='150' />baseUrl task below ... */}
                      
                      <Media object src={baseUrl + partner.image} alt={partner.name} width='150' /> 
                        <Media body className='ml-5 mb-4'>
                      
                            <Media heading>
                                    {partner.name}
                            </Media>
                            {partner.description}
                        </Media>
                    </React.Fragment>
            );
        } else return(
            (<div></div>)
        );
    }

    function PartnerList(props) {
        const partners = props.partners.partners.map(partner => {
            return(
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.50) translateY(-50%)'
                }}>
                <Media tag="li" key={partner.id}>
                    <RenderPartner partner={partner} />
                </Media>
                </FadeTransform>
            );
        });
        if (props.partners.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }

        if (props.partners.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.partners.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="row row-content">
                <div className="col-12">
                    <h3>Community Partners</h3>
                </div>
                <div className="col mt-4">
                    <Media List>
                        <Stagger in>
                        {partners}
                        </Stagger>
                    </Media>
                </div>
            </div>
        )
    }

    function About(props) {
        //Below Task 3/3 ...
            const partners = props.partners.partners.map(partner => {
                
                return (
                    <Media key={partner.id} tag='li'>
                        <RenderPartner partner={partner} />
                    </Media>
             
                );
                /*
               return (
                   <h5>
                       {partner.name}
                   </h5>
               )
               */
            });

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>About Us</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>About Us</h2>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-sm-6">
                    <h3>Our Mission</h3>
                    <p>We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.</p>
                </div>
                <div className="col-sm-6">
                    <Card>
                        <CardHeader className="bg-primary text-white"><h3>Facts At a Glance</h3></CardHeader>
                        <CardBody>
                            <dl className="row">
                                <dt className="col-6">Founded</dt>
                                <dd className="col-6">February 3, 2016</dd>
                                <dt className="col-6">No. of Campsites in 2019</dt>
                                <dd className="col-6">563</dd>
                                <dt className="col-6">No. of Reviews in 2019</dt>
                                <dd className="col-6">4388</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">42</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col">
                    <Card className="bg-light mt-3">
                        <CardBody>
                            <blockquote className="blockquote">
                                <p className="mb-0">I will not follow where the path may lead, but I will go where there is no path, and I will leave a trail.</p>
                                <footer className="blockquote-footer">Muriel Strode,{' '}
                                    <cite title="Source Title">"Wind-Wafted Wild Flowers" -
                                    The Open Court, 1903</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <PartnerList partners={props.partners} />
            {/*
            <div className="row row-content">
                <div className="col-12">
                    <h3>Community Partners</h3>
                </div>
                
                <div className="col mt-4">
                    <Media list>
                        {partners}
                    </Media>
                </div>
                */}

            </div>
        
    );
}

export default About;

// As with all other assignments, 99.999% of this work came directly from Instructor HE and also Nucamp tutorials... In particular with this assignment, student author (that's me, Franklin Bueno) worked from the collaboration with fellow students DM and AP and also worked from the suggestions of Instructor HE... Also, Instructor HE bailed out the student author and had the student author change this.props.partners to this.state.partners in line 66 in the MainComponent file...


// ATTENTION/ALERT - for week five assignment, student author (me, Franklin Bueno), borrowed VERY HEAVILY from the screenshots and slack messages from extremely helpful Instructor HE and also boot camp classmates...