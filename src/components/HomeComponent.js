import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';



function RenderCard({item, isLoading, errMess}) {
    if (isLoading) {
        return <Loading />;
    }
    if (errMess) {
        return <h4>{errMess}</h4>;
    }
    return (
        <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(50%)'
        }}>
        <Card>
            <CardImg src={baseUrl + item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    </FadeTransform>
    );
}
//below, Task 1, Point 5,  Open Circle 1/1,  all places with new addition of featurs to partners RenderCard ... pass the isLoading and errMess properties of the partners object to the Home component  ...
function Home(props) {
    return (
        <div className="container">
               <div className="row">
                <div className="col-md m-1">
                <RenderCard
                        item={props.campsite}
                        isLoading={props.campsitesLoading}
                        errMess={props.campsitesErrMess}
                    />
                </div>
                <div className="col-md m-1">
                <RenderCard
                        item={props.promotion}
                        isLoading={props.promotionLoading}
                        errMess={props.promotionErrMess}
                    />                
                    </div>
                <div className="col-md m-1">
                    <RenderCard item={props.partner}
                    isLoading = {props.partnersLoading} 
                    errMess = {props.partnersErrMess}
                     />
                </div>
            </div>
        </div>
    );
}

export default Home; 



// ATTENTION/ALERT - for week five assignment, student author (me, Franklin Bueno), borrowed VERY HEAVILY from the screenshots and slack messages from extremely helpful Instructor HE and also boot camp classmates...