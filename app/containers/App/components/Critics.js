import React, {useState, useEffect} from 'react';
import allCritics from '../../../public/critics.json';
import reviews from '../../../public/movie-reviews.json';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: AddBox,
  Check: Check,
  Clear: Clear,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Edit: Edit,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage: FirstPage,
  LastPage: LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search: Search,
  SortArrow: ArrowUpward,
  ThirdStateCheck: Remove,
  ViewColumn: ViewColumn
};

const Critics = () => {
    const [reviewsCount, setReviewsCount] = useState(null);
    const [tableRows, setTableRows] = useState([]);

    const columns = [
        {field: 'name', title: 'Name'},
        {field: 'image', title: 'Image', render: rowData => <img src={rowData.image} />},
        {field: 'bio', title: 'Bio'},
        {field: 'numberOfReviews', title: 'Number of Reviews'},
        {field: 'numberOfCriticsPick', title: 'Number of Critics Pick'}
    ]


    const generateTableRows = (criticsReviewsCount) => {
        const rows = allCritics.map(c => { 
            console.log('reviews inside of map: ', criticsReviewsCount);
            return (
                {
                    name: c.display_name,
                    image: c.multimedia ? c.multimedia.resource.src : 'https://cdn.iconscout.com/icon/free/png-256/account-avatar-profile-human-man-user-30448.png',
                    bio: 'no bio available',
                    numberOfReviews: criticsReviewsCount ? criticsReviewsCount[0][c.display_name ? c.display_name.toUpperCase() : ''] || 0 : 0,
                    numberOfCriticsPick: criticsReviewsCount ? criticsReviewsCount[1][c.display_name ? c.display_name.toUpperCase() : ''] || 0 : 0,
                }
            )
        })
        setTableRows(rows)
    }

    const reviewsPerCritic = () => {
        let freqCount = {};
        let criticsPickCount = {};
        reviews.map(r => {
            if(!freqCount[r.byline]) {
                freqCount[r.byline] = 1;
            } else {
                freqCount[r.byline] += 1;
            }

            if(!criticsPickCount[r.byline] && r.critics_pick === 1) {
                criticsPickCount[r.byline] = 1;
            } else if(!criticsPickCount[r.byline] && r.critics_pick === 0) {
                criticsPickCount[r.byline] = 0;
            } else if(criticsPickCount[r.byline] && r.critics_pick === 1) {
                criticsPickCount[r.byline] += 1;
            }
        })
        console.log('data needed:', [freqCount, criticsPickCount])
        return [freqCount, criticsPickCount];
    }
    useEffect(() => {
        setReviewsCount(reviewsPerCritic());
        generateTableRows(reviewsCount);
    }, [])
    
    useEffect(() => {
        // console.log('state change', reviewsCount)
        generateTableRows(reviewsCount);
    }, [reviewsCount])

    return (
        <div style={{ maxWidth: '80%' }}>
        <MaterialTable  
            icons={tableIcons}
            columns={columns}
            data={tableRows}
            options={{
                pageSize: 20,
                pageSizeOptions : [20, 30, 50],
            }}
            title="Critics"
            />
    </div>
    )
}

export default Critics;

