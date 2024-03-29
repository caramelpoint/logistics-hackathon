import { Button, SwipeableDrawer } from '@mui/material'
import { useState } from 'react'
import styled from 'styled-components'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined'
import { TrackingEventsTimeline } from '../tracking-timeline'
import { EventType } from '../../../../types/tracking.type'
import { OrderStatus } from '../../../../types/order-status'

const $Container = styled.div`
  position: absolute;
  bottom: 25px;
`

const $SwipeableDrawer = styled(SwipeableDrawer)`
  .MuiDrawer-paper {
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
  }
`

interface EventsDrawerProps {
  events?: EventType[]
  orderStatus?: OrderStatus
}

export const EventsDrawer = ({ events, orderStatus }: EventsDrawerProps) => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <$Container>
      <Button variant="contained" onClick={toggleDrawer(!open)} startIcon={<ListAltOutlinedIcon />}>
        Events
      </Button>
      <$SwipeableDrawer anchor="bottom" open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        {events && <TrackingEventsTimeline events={events} orderStatus={orderStatus} />}
      </$SwipeableDrawer>
    </$Container>
  )
}
