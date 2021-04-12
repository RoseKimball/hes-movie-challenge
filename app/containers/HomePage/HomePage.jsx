import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import reviews from '../../public/movie-reviews.json';
// import { DataGrid } from '@material-ui/data-grid';
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


const HomePage = () => {
const [selectedRow, setSelectedRow] = useState(null);
const [selectedRowData, setSelectedRowData] = useState(null);
const [columns, setColumns] = useState([
  {field: 'image', title: 'Image', filtering: false, render: rowData => <img src={rowData.image} />},
  {field: 'title', title: 'Title', filtering: false},
  {field: 'date', title: 'Date', filterPlaceholder: 'Search'},
  {field: 'rating', title: 'Rating', filterPlaceholder: 'Search'},
  {field: 'criticsPick', title: 'Critics Pick', filterPlaceholder: 'Search'},
  {field: 'headline', hidden: true},
  {field: 'summary', hidden: true},
  {field: 'critic', hidden: true},
  {field: 'link', hidden: true},
  {field: 'suggestedLink', hidden: true}
])
// const [data, setData] = useState(displayData);

// helper functions

// console.log('sorted arr: ', sortedByPubDate);

const displayData = () => {
   reviews.sort((a, b) => {
        return new Date(a.publication_date) - new Date (b.publication_date);
    })
    reviews.map(i => {
      if(!i.mpaa_rating.length) i.mpaa_rating = 'No Rating'
      // console.log('ciritics pick:', i.display_title, i.critics_pick)
      if(i.critics_pick === 1) {
        i.critics_pick = 'Yes';
        // console.log(i.critics_pick, 'yes')
      } else if(i.critics_pick === 0) {
        i.critics_pick = 'No'
      }
      return i;
    });
    return reviews;
    // console.log(reviews)
    // setData(reviews);
}



//define table data
 

const rows = displayData().map(r => (
  {
    image: r.multimedia.src,
    title: r.display_title,
    date: r.publication_date,
    rating: r.mpaa_rating,
    criticsPick: r.critics_pick,
    headline: r.headline,
    summary: r.summary_short,
    critic: r.byline,
    link: r.link.url,
    suggestedLink: r.link.suggested_link_text
  }
))

// useEffect(() => {
//   displayData()
// }, [selectedRowData])

  return (
    <>
    <div style={{ maxWidth: '80%' }}>
      <MaterialTable  
          icons={tableIcons}
          columns={columns}
          data={rows}
          onRowClick={(
            (evt, selectedRow) =>
              setSelectedRow(selectedRow.tableData.id)
            )}
          onRowClick={(
            (evt, rowData) => 
              setSelectedRowData(rowData)
          )}
          options={{
            filtering: true,
            pageSize: 20,
            pageSizeOptions : [20, 30, 50],
            rowStyle: rowData => ({
              backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
            })
          }}
          title="Reviews"
        />
    </div>
    <div>
      {selectedRowData === null ? (<p>Selected review information will apear here</p>) : (
        <>
          <h5>{selectedRowData.title}</h5>
          <img src={selectedRowData.image} alt={selectedRowData.title} style={{maxWidth: 250, maxHeight: 170}}></img>
          <p>Rating: {selectedRowData.rating}</p>
          <p>Critic's pick: {selectedRowData.criticsPick}</p>
          <h4>{selectedRowData.headline}</h4>
          <p>{selectedRowData.summary}</p>
          <p>Review by: {selectedRowData.critic}</p>
          <a href={selectedRowData.link}>{selectedRowData.suggestedLink}</a>
        </>
      )}
      <div style={{padding: '100px', width: '20%'}}></div>
      <h1><Link to='/critics'>Click Here to view all critics</Link></h1>
    </div>
   </>
  )
  }


export default HomePage;

