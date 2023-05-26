import { Box, Button, MenuItem } from '@mui/material';
import { memo, useState } from 'react';
import DatePicker from 'react-datepicker';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

interface Props {
  getDate?: any;
}

function range(start: number, end: number, step: number = 1): number[] {
  const len = Math.floor((end - start) / step) + 1;
  return Array(len)
    .fill(0)
    .map((_, idx) => start + idx * step);
}

const InputDateTime = ({ getDate }: Props) => {
  const [startDate, setStartDate] = useState<any>(null);
  const [openBar, setOpenBar] = useState<boolean>(true);
  const [bool, setBool] = useState<boolean>(false);
  const years = range(1923, new Date().getFullYear() + 1, 1);

  const handleBlur = () => {
    if (startDate === null) {
      setBool(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: bool ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
        input: {
          border: 'none',
          backgroundColor: bool ? 'rgb(255, 239, 239)' : 'rgb(241, 243, 245)',
          width: '100%',
          outline: 'none',
          padding: '0 0 0 12px',
        },
        padding: '12px',
        borderRadius: '8px',
        maxWidth: '270px',
        justifyContent: 'space-around',
        border: bool ? '1px solid rgb(243, 174, 175)' : 'none',
      }}
      onBlur={handleBlur}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '24px', flexShrink: 0 }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.99984 1.5C6.27598 1.5 6.49984 1.72386 6.49984 2V3H13.4998V2C13.4998 1.72386 13.7237 1.5 13.9998 1.5C14.276 1.5 14.4998 1.72386 14.4998 2V3H16.8332C17.6616 3 18.3332 3.67157 18.3332 4.5V16.8333C18.3332 17.6618 17.6616 18.3333 16.8332 18.3333H3.1665C2.33808 18.3333 1.6665 17.6618 1.6665 16.8333V4.5C1.6665 3.67157 2.33808 3 3.1665 3H5.49984V2C5.49984 1.72386 5.72369 1.5 5.99984 1.5ZM13.4998 4V4.66667C13.4998 4.94281 13.7237 5.16667 13.9998 5.16667C14.276 5.16667 14.4998 4.94281 14.4998 4.66667V4H16.8332C17.1093 4 17.3332 4.22386 17.3332 4.5V7H2.6665V4.5C2.6665 4.22386 2.89036 4 3.1665 4H5.49984V4.66667C5.49984 4.94281 5.72369 5.16667 5.99984 5.16667C6.27598 5.16667 6.49984 4.94281 6.49984 4.66667V4H13.4998ZM2.6665 8V16.8333C2.6665 17.1095 2.89036 17.3333 3.1665 17.3333H16.8332C17.1093 17.3333 17.3332 17.1095 17.3332 16.8333V8H2.6665ZM9.33317 9.83333C9.33317 9.55719 9.55703 9.33333 9.83317 9.33333H10.1665C10.4426 9.33333 10.6665 9.55719 10.6665 9.83333V10.1667C10.6665 10.4428 10.4426 10.6667 10.1665 10.6667H9.83317C9.55703 10.6667 9.33317 10.4428 9.33317 10.1667V9.83333ZM12.4998 9.33333C12.2237 9.33333 11.9998 9.55719 11.9998 9.83333V10.1667C11.9998 10.4428 12.2237 10.6667 12.4998 10.6667H12.8332C13.1093 10.6667 13.3332 10.4428 13.3332 10.1667V9.83333C13.3332 9.55719 13.1093 9.33333 12.8332 9.33333H12.4998ZM14.6665 9.83333C14.6665 9.55719 14.8904 9.33333 15.1665 9.33333H15.4998C15.776 9.33333 15.9998 9.55719 15.9998 9.83333V10.1667C15.9998 10.4428 15.776 10.6667 15.4998 10.6667H15.1665C14.8904 10.6667 14.6665 10.4428 14.6665 10.1667V9.83333ZM15.1665 12C14.8904 12 14.6665 12.2239 14.6665 12.5V12.8333C14.6665 13.1095 14.8904 13.3333 15.1665 13.3333H15.4998C15.776 13.3333 15.9998 13.1095 15.9998 12.8333V12.5C15.9998 12.2239 15.776 12 15.4998 12H15.1665ZM11.9998 12.5C11.9998 12.2239 12.2237 12 12.4998 12H12.8332C13.1093 12 13.3332 12.2239 13.3332 12.5V12.8333C13.3332 13.1095 13.1093 13.3333 12.8332 13.3333H12.4998C12.2237 13.3333 11.9998 13.1095 11.9998 12.8333V12.5ZM9.83317 12C9.55703 12 9.33317 12.2239 9.33317 12.5V12.8333C9.33317 13.1095 9.55703 13.3333 9.83317 13.3333H10.1665C10.4426 13.3333 10.6665 13.1095 10.6665 12.8333V12.5C10.6665 12.2239 10.4426 12 10.1665 12H9.83317ZM6.6665 12.5C6.6665 12.2239 6.89036 12 7.1665 12H7.49984C7.77598 12 7.99984 12.2239 7.99984 12.5V12.8333C7.99984 13.1095 7.77598 13.3333 7.49984 13.3333H7.1665C6.89036 13.3333 6.6665 13.1095 6.6665 12.8333V12.5ZM4.49984 12C4.22369 12 3.99984 12.2239 3.99984 12.5V12.8333C3.99984 13.1095 4.2237 13.3333 4.49984 13.3333H4.83317C5.10931 13.3333 5.33317 13.1095 5.33317 12.8333V12.5C5.33317 12.2239 5.10931 12 4.83317 12H4.49984ZM3.99984 15.1667C3.99984 14.8905 4.22369 14.6667 4.49984 14.6667H4.83317C5.10931 14.6667 5.33317 14.8905 5.33317 15.1667V15.5C5.33317 15.7761 5.10931 16 4.83317 16H4.49984C4.2237 16 3.99984 15.7761 3.99984 15.5V15.1667ZM7.1665 14.6667C6.89036 14.6667 6.6665 14.8905 6.6665 15.1667V15.5C6.6665 15.7761 6.89036 16 7.1665 16H7.49984C7.77598 16 7.99984 15.7761 7.99984 15.5V15.1667C7.99984 14.8905 7.77598 14.6667 7.49984 14.6667H7.1665ZM9.33317 15.1667C9.33317 14.8905 9.55703 14.6667 9.83317 14.6667H10.1665C10.4426 14.6667 10.6665 14.8905 10.6665 15.1667V15.5C10.6665 15.7761 10.4426 16 10.1665 16H9.83317C9.55703 16 9.33317 15.7761 9.33317 15.5V15.1667ZM12.4998 14.6667C12.2237 14.6667 11.9998 14.8905 11.9998 15.1667V15.5C11.9998 15.7761 12.2237 16 12.4998 16H12.8332C13.1093 16 13.3332 15.7761 13.3332 15.5V15.1667C13.3332 14.8905 13.1093 14.6667 12.8332 14.6667H12.4998Z"
          fill="#0081F1"
        ></path>
      </svg>
      <DatePicker
        onClickOutside={() => setOpenBar(true)}
        renderCustomHeader={({ changeYear, decreaseMonth, increaseMonth, monthDate }) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '4px 8px',
            }}
          >
            <Button
              onClick={decreaseMonth}
              sx={{ maxWidth: '16px', minWidth: '16px', margin: '0', padding: '0', color: '#7b8287' }}
            >
              <KeyboardArrowLeftIcon color="disabled" fontSize="small" />
            </Button>
            <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <h6
                className="react-datepicker__current-month"
                style={{ fontFamily: 'SVN-Sofia-Regular', fontWeight: '400', fontSize: '18px', margin: 0 }}
              >
                {monthDate.toLocaleString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })}
              </h6>
              <Button sx={{ maxWidth: '16px', minWidth: '16px', margin: 'auto', padding: '0', color: '#7b8287' }}>
                <KeyboardArrowDownIcon onClick={(e) => setOpenBar(!openBar)} sx={{ fontSize: '20px' }} />
              </Button>
              <Box
                sx={{
                  minHeight: '180px',
                  maxHeight: '180px',
                  overflow: 'auto',
                  minWidth: '125px',
                  backgroundColor: 'rgb(255, 255, 255)',
                  border: '1px solid rgb(223, 227, 230)',
                  borderRadius: '8px',
                  '&::-webkit-scrollbar': { width: '10px', height: '10px', backgroundColor: '#f1f3f5' },
                  '&::-webkit-scrollbar-thumb': {
                    borderRadius: '8px',
                    WebkitBoxShadow: '#d7dbdf',
                    backgroundColor: '#d7dbdf',
                  },
                  position: 'absolute',
                  transform: 'translate3d(-20px, 38px, 0px)',
                }}
                hidden={openBar}
              >
                {years.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    onClick={(e) => {
                      changeYear(Number(e.currentTarget.value));
                      setOpenBar(true);
                    }}
                    sx={{
                      margin: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      fontFamily: 'SVN-Sofia-Regular',
                      position: 'relative',
                      '&:hover': { color: 'rgb(48, 164, 108)', backgroundColor: 'rgba(193, 200, 205, 0.08)' },
                    }}
                  >
                    {String(option) ===
                      monthDate.toLocaleString('en-US', {
                        year: 'numeric',
                      }) && <DoneIcon sx={{ height: '15px', width: '15px', position: 'absolute', left: '15px' }} />}
                    <span>{option}</span>
                  </MenuItem>
                ))}
              </Box>
            </Box>

            <Button
              onClick={increaseMonth}
              sx={{ maxWidth: '16px', minWidth: '16px', margin: '0', padding: '0', color: '#7b8287' }}
            >
              <KeyboardArrowRightIcon color="disabled" fontSize="small" />
            </Button>
          </div>
        )}
        selected={startDate}
        onChange={(date: any) => {
          const formatterDate = format(date, 'yyyy-MM-dd');
          getDate(formatterDate);
          setStartDate(date);
          setBool(false);
        }}
        dateFormat="yyyy-MM-dd"
      />
      {startDate && (
        <svg
          width="20"
          height="20"
          style={{ marginRight: '8px' }}
          viewBox="0 0 15 15"
          fill="#687076"
          xmlns="http://www.w3.org/2000/svg"
          cursor="pointer"
          onClick={() => {
            setStartDate(null);
            setBool(true);
          }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.7814 4.03157C12.0059 3.80702 12.0059 3.44295 11.7814 3.2184C11.5568 2.99385 11.1928 2.99385 10.9682 3.2184L7.4998 6.68682L4.03139 3.2184C3.80684 2.99385 3.44277 2.99385 3.21822 3.2184C2.99367 3.44295 2.99367 3.80702 3.21822 4.03157L6.68663 7.49999L3.21822 10.9684C2.99367 11.193 2.99367 11.557 3.21822 11.7816C3.44277 12.0061 3.80684 12.0061 4.03139 11.7816L7.4998 8.31316L10.9682 11.7816C11.1928 12.0061 11.5568 12.0061 11.7814 11.7816C12.0059 11.557 12.0059 11.193 11.7814 10.9684L8.31298 7.49999L11.7814 4.03157Z"
            fill="black"
          ></path>
        </svg>
      )}
      <KeyboardArrowDownIcon sx={{ color: '#7b8287', fontSize: '20px' }} />
    </Box>
  );
};

export default memo(InputDateTime);
