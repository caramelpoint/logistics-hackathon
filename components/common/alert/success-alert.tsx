import * as React from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'
import { AlertTitle, Link, styled } from '@mui/material'
import { useState } from 'react'
import { config } from '../../../config/env.config'

const $Alert = styled(Alert)`
  position: fixed;
  top: 25px;
  background-color: #81c7849f;
  font-size: 16px;
  color: white;
`
const $Link = styled(Link)`
  margin-left: 5px;
`
interface AlertProps {
  txHash: string
}
export const SuccessAlert = ({ txHash }: AlertProps) => {
  const [open, setOpen] = useState<boolean>(true)
  const url = config.smartContractConfig.transactionDetailUrl
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <$Alert
          variant="outlined"
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle sx={{ fontSize: 22 }}>Transaction success!</AlertTitle>
          Enter
          <$Link href={`${url}/${txHash}`} target="_blank">
            this link
          </$Link>
        </$Alert>
      </Collapse>
    </Box>
  )
}
