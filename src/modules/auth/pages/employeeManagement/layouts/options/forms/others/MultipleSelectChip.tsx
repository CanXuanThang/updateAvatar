import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { API_PATHS } from '../../../../../../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../../../../../../utils/httpResponseCode';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../../../../../../utils/constants';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  listBenefit: any;
  setListBenefit: any;
}

export default function MultipleSelectChip({ listBenefit, setListBenefit }: Props) {
  const [benefits, setBenefit] = React.useState([]);
  const [value, setValue] = React.useState<any>([]);

  const getBenefit = React.useCallback(async () => {
    const json = await axios.get(API_PATHS.getBenefit, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get(ACCESS_TOKEN_KEY),
      },
    });

    if (json.status === RESPONSE_STATUS_SUCCESS) {
      setBenefit(json.data.data);
    }
  }, []);

  React.useEffect(() => {
    getBenefit();
  }, [getBenefit]);

  React.useEffect(() => {
    const benefitIds = value.map((item: any) => item.id);
    setListBenefit({ ...listBenefit, benefits: benefitIds });
  }, [value]);

  return (
    <Box>
      <FormControl
        fullWidth
        sx={{ background: '#f1f3f5', ':first-of-type': { maxHeight: '150px', overflowY: 'auto' } }}
      >
        <Select
          multiple
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          sx={{
            div: { padding: '5px' },
            minHeight: '47px',
          }}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value: any) => (
                <Chip
                  key={value.id}
                  label={value.name}
                  sx={{ color: 'rgb(0, 145, 255)', backgroundColor: 'white', borderRadius: '6px' }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {benefits &&
            benefits.map((benefit: any) => (
              <MenuItem key={benefit.id} value={benefit} data-name={benefit && benefit.name}>
                {benefit && benefit.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
