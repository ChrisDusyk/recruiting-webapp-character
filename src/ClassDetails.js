import './ClassDetails.css';

function ClassDetails({ classInfo }) {
    return (
        <div className='listContainer'>
            {classInfo && Object.entries(classInfo).map(([key, value]) => <span className='classList' key={key}>{`${key}: ${value}`}</span>)}
        </div>
    );
}

export default ClassDetails;