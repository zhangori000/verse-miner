import React, { Fragment, Component } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import logo from '../../images/logo/default-monochrome.svg';

export class Verse extends Component {
    componentDidMount() {
        console.log("componentDidMount()", this.loading);
        this.props.getVerseAssociations(this.props.match.params.verseData); 
        
    }

    static propTypes = {
        loading: PropTypes.bool,
        verseAssociations: PropTypes.object.isRequired,
        getVerseAssociations: PropTypes.func.isRequired
    }

    render() {
        const {
            philJohnsonUrl,
            johnMacarthurUrl,
            heartCryUrl,
            paulWasherUrl,
            onlineBibleUrl,
            bibleOrgUrl,
            bibleHubUrl,
            bibleCrossReferences,
            bibleHubParallel,
            constablesNotesUrl,
            enduringWordUrl
        } = this.props.verseAssociations;
        const { loading } = this.props;
        if(loading) return <Spinner/>
        return (
            <Fragment>
                <Link to='/verse-miner/' className='btn btn-light'>
                    Back to Search
                </Link>
                <div class="all-center" style={{width:"350px"}}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className="card">
                    <div className="all-center">
                        <a href={onlineBibleUrl} className='btn btn-link' target='_blank' rel="noreferrer">Open In Another Tab</a>
                        <iframe src={onlineBibleUrl} width="100%" height="600px" title="Phil Johnson Sermons"></iframe>
                    </div>
                </div>
                <div className='card text-center all-center'>
                    <h1> Sermons: </h1>
                    <div>
                        <a href={philJohnsonUrl} target='_blank' rel="noreferrer" className='btn-sm btn-dark my-1'>Phil Johnson</a>
                        <a href={johnMacarthurUrl} target='_blank' rel="noreferrer" className='btn-sm btn-dark my-1'>John MacArthur</a>
                        <a href={paulWasherUrl} target='_blank' rel="noreferrer" className='btn-sm btn-dark my-1'>Paul Washer</a>
                        <a href={heartCryUrl} target='_blank' rel="noreferrer" className='btn-sm btn-dark my-1'>Heart Cry</a>
                    </div>  
                </div>
                <div className='card text-center all-center'>
                    <h1> Other resources: </h1>
                    <div>
                        <a href={bibleOrgUrl} target='_blank' rel="noreferrer" className='btn-sm btn-dark my-1'>Bible.com Study Guides</a>
                        <a href={bibleHubUrl} target='_blank' rel="noreferrer" className='btn-sm btn-dark my-1'>Bible Hub</a>
                        <a href={constablesNotesUrl} target='_blank' rel="noreferrer" className='btn-sm btn-dark my-1'>Constable's Notes</a>
                        <a href={enduringWordUrl} target='_blank' rel="noreferrer" className='btn-sm btn-dark my-1'>Chapter Commentary</a>
                        <a href={bibleCrossReferences} target='_blank' rel="noreferrer" className='btn-sm btn-dark my-1'>Cross References</a>
                        <a href={bibleHubParallel} target='_blank' rel="noreferrer" className='btn-sm btn-dark my-1'>Version Comparison</a>
                    </div>  
                </div>
                
                
            </Fragment>
        );
    }
}

export default Verse;