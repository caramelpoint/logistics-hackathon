import React, { useState } from 'react'
import styled from 'styled-components'
import { SearchInput } from './search-input'
import { TrackingInfo } from './tracking-info'
import { TrackingTable } from './tracking-table'
import { Map } from './map/map'
import { getTrackingInfo } from '../../../services/frontend-services/tracking'
import { TrackingType } from '../../../types/tracking.type'
import { getDeliveredAndOrderedEvents } from '../../../utils/events'

const $Container = styled.div`
  margin-top: 40px;
  padding-left: 30px;
`
export const TrackingPage = () => {
  const [showTrackingInfo, setShowTrackingInfo] = useState<boolean>(false)
  const [trackingId, setTrackingId] = useState<string>('')
  const [trackingInfo, setTrackingInfo] = useState<TrackingType>()

  const onInputChange = (value: string) => {
    setTrackingId(value)
  }

  const $Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  `

  const onSearchTrackingId = async () => {
    const response = await getTrackingInfo(trackingId)
    const deliveredEvents = getDeliveredAndOrderedEvents(response.events)
    setTrackingInfo({ currentStatus: response.currentStatus, events: deliveredEvents })
    setShowTrackingInfo(true)
  }

  return (
    <$Container>
      <SearchInput onInputChange={onInputChange} trackingId={trackingId} onSubmit={onSearchTrackingId} />
      {showTrackingInfo && trackingInfo && (
        <>
          <TrackingInfo trackingId={trackingId} orderStatus={trackingInfo.currentStatus} />
          <$Wrapper>
            <Map markers={trackingInfo.events} />
            <TrackingTable events={trackingInfo.events} />
          </$Wrapper>
        </>
      )}
    </$Container>
  )
}
