import { Box, Button, Grid, IconButton } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import TableUpdate from './TableUpdate';

function Document() {
  const [fileList, setFileList] = useState<any>();
  const [fileName, setFileName] = useState<string>('');
  const [datas, setDatas] = useState<any>([]);
  const [dataTable, setDataTable] = useState({
    date: '',
    documentName: '',
  });

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    setFileList(e.target.files);
    setDataTable({
      ...dataTable,
      date: formattedDate,
    });
  };

  useEffect(() => {
    setDataTable({
      ...dataTable,
      documentName: fileName,
    });
  }, [fileName]);

  useEffect(() => {
    if (fileList && fileList.length > 0) {
      setFileName(fileList[0].name);
    }
  }, [fileList]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '10px',
        borderRadius: '6px',
        border: '1px solid rgb(223,227,230)',
      }}
    >
      <Box sx={{ maxWidth: '560px', paddingLeft: '20px', paddingRight: '20px' }}>
        <Grid container spacing="rows" sx={{ alignItems: 'center' }}>
          <Grid item sm={12} md={5} xl={4}>
            Document
          </Grid>
          <Grid item sm={12} md={7} xl={8} sx={{ margin: '16px 0', label: { fontSize: '14px' } }}>
            <Button
              component="label"
              sx={{
                height: '32px',
                fontSize: '16px',
                backgroundColor: 'rgb(237, 246, 255)',
                minWidth: '98px',
                border: '1px dashed',
                color: 'rgb(0, 145, 255)',
                textTransform: 'none',
              }}
            >
              <IconButton component="span" sx={{ padding: 0, marginRight: '4px' }}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-fill-all"
                  style={{ fill: 'currentcolor' }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.81825 1.18191C7.64251 1.00618 7.35759 1.00618 7.18185 1.18191L4.18185 4.18191C4.00611 4.35765 4.00611 4.64257 4.18185 4.81831C4.35759 4.99404 4.64251 4.99404 4.81825 4.81831L7.05005 2.58651V9.49999C7.05005 9.74852 7.25152 9.94999 7.50005 9.94999C7.74858 9.94999 7.95005 9.74852 7.95005 9.49999V2.58651L10.1819 4.81831C10.3576 4.99404 10.6425 4.99404 10.8182 4.81831C10.994 4.64257 10.994 4.35765 10.8182 4.18191L7.81825 1.18191ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
                    fill="rgb(0, 145, 255)"
                  ></path>
                </svg>
              </IconButton>
              Upload
              <input type="file" hidden accept="image/*,.pdf,.csv,.xlsx,.docx" onChange={handleUploadFile} />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <TableUpdate data={datas} />
    </Box>
  );
}

export default Document;
