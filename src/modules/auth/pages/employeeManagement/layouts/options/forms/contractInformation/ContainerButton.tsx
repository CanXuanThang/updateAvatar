import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  data: any;
  getData: any;
}

function ContainerButton({ data, getData }: Props) {
  const [fileName, setFileName] = useState<string>();
  const [fileList, setFileList] = useState<any>();
  const [datas, setDatas] = useState<any>([]);

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
  };

  useEffect(() => {
    if (fileList && fileList.length > 0) {
      setFileName(fileList[0].name);
    }
  }, [fileList]);

  const handleClick = () => {
    const newData = [...datas, data];
    setDatas(newData);
    getData(newData);
  };

  return (
    <Box>
      <Stack sx={{ display: 'flex', flexFlow: 'row wrap', gap: '10px', justifyContent: 'space-between' }}>
        <Box>
          <Button
            component="label"
            sx={{
              height: '48px',
              fontSize: '16px',
              backgroundColor: 'rgb(237, 246, 255)',
              minWidth: '195px',
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
            Upload file
            <input type="file" hidden accept="image/*,.pdf,.csv,.xlsx,.docx" onChange={handleUploadFile} />
          </Button>
        </Box>
        <Button
          sx={{
            height: '48px',
            fontSize: '16px',
            backgroundColor: 'rgb(105, 217, 193)',
            minWidth: '195px',
            color: 'rgb(234, 251, 246)',
            textTransform: 'none',
            '&:hover': { boxShadow: 'none', backgroundColor: 'rgb(54, 215, 180)' },
          }}
          onClick={handleClick}
        >
          Add
        </Button>
      </Stack>
      {fileName && (
        <Box
          sx={{
            display: 'inline-flex',
            backgroundColor: 'rgb(241, 243, 245)',
            padding: '6px 6px 6px 10px',
            minWidth: '170px',
            justifyContent: 'space-between',
            marginTop: '10px',
          }}
        >
          <Typography component="p">{fileName}</Typography>
          <Button
            sx={{
              minWidth: '20px !important',
              padding: '0 !important',
            }}
            onClick={() => setFileName('')}
          >
            <CloseIcon />
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ContainerButton;
