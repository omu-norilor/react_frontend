import { MenuItem } from '@mui/material';
import { Select } from '@mui/material';
import {
    gridPageSelector,
    useGridApiContext,
    useGridSelector
  } from "@mui/x-data-grid";
import { Pagination } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function CustomPagination(props) {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    
    const { pageCount, currentPage,currentPageSize, setCurrentPage, setCurrentPageSize } = props;
  
  
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
      apiRef.current.setPage(value - 1);
    };
  
    const handlePageSizeChange = (event) => {
      const newPageSize = event.target.value;
      setCurrentPageSize(newPageSize);
      setCurrentPage(1);
      apiRef.current.setPageSize(newPageSize);
      apiRef.current.setPage(0);
    };
  
    return (
      <Box display="flex" alignItems="center">
        <Typography variant="caption" style={{ marginRight: '16px' }}>
          Rows per page:
        </Typography>
        <Select value={currentPageSize} defaultValue={5} onChange={handlePageSizeChange} style={{ marginRight: '16px' }}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
        <Pagination
          color="primary"
          count={pageCount}
          page={currentPage }
          onChange={handlePageChange}
        />
      </Box>
    );
  }
  CustomPagination.defaultProps = {
    currentPageSize: 5
  };