import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { DataGrid, GridColDef, GridToolbar, GridSelectionModel } from '@mui/x-data-grid'
import type {} from '@mui/x-data-grid/themeAugmentation'
import { Box } from '@mui/material'
import styled from 'styled-components'
import { Dropdown } from '../common/dropdown.component'
import { useQuery } from 'react-query'
import { getOrders } from '../../services/frontend-services/orders'
import { OrderStatus } from '../../types/order-status'
import { SuccessAlert } from '../common/alert/success-alert'
import { initializeOrders, setOrderAsDelivered } from '../../services/frontend-services/orders'
import BounceLoader from 'react-spinners/BounceLoader'
import { ErrorAlert } from '../common/alert/error-alert'
import { OrderType } from '../../types/order.type'
import { getOrderAddress } from '../../services/frontend-services/google-maps'

const $GridContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.colors.nero};
  height: fit-content;
  width: 1200px;
  height: auto;
  margin: 20px auto;
  border-radius: 12px;
`

const $GridHeader = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 15px;
  margin-top: 60px;
`

const $LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export type TableRowType = {
  id: string
  sku: string
  status: OrderStatus
  address: string
  tracking: string
}

const columns: GridColDef[] = [
  { headerClassName: 'super-app-theme--header', field: 'id', headerName: 'Order ID', width: 300 },
  { headerClassName: 'super-app-theme--header', field: 'sku', headerName: 'SKU', width: 150 },
  { headerClassName: 'super-app-theme--header', field: 'status', headerName: 'Status', width: 150 },
  { headerClassName: 'super-app-theme--header', field: 'address', headerName: 'Destination Address', width: 150 },
  { headerClassName: 'super-app-theme--header', field: 'tracking', headerName: 'Tracking ID', width: 300 },
]

export function Orders() {
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>()
  const [selectedRows, setSelectedRows] = useState<TableRowType[]>([])
  const { data: orders, refetch } = useQuery('get-orders', getOrders)
  const [parsedOrders, setParsedOrders] = useState<TableRowType[]>([])
  const [transactionHash, setTransactionHash] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const initializeOrdersMutation = useMutation(initializeOrders, {
    onSuccess: data => {
      setTransactionHash(data.txHash)
      refetch()
    },
    onError: error => {
      error && setError(true)
    },
  })
  const setOrderAsDeliveredMutation = useMutation(setOrderAsDelivered, {
    onSuccess: data => {
      setTransactionHash(data.txHash)
      refetch()
    },
    onError: error => {
      error && setError(true)
    },
  })

  useEffect(() => {
    if (!orders) return
    setOrders(orders)
  }, [orders])

  const setOrders = async (orders: OrderType[]) => {
    let newParsedOrders: TableRowType[] = []
    for (const order of orders) {
      const address = await getOrderAddress(order.destinationAddress.latitude, order.destinationAddress.longitude)
      newParsedOrders.push({
        id: order.id,
        sku: order.sku,
        status: order.status,
        address: address,
        tracking: order.trackingId,
      })
    }
    setParsedOrders(newParsedOrders)
  }

  const setOrderAsDeliveredAction = async () => {
    for (let row of selectedRows) {
      await setOrderAsDeliveredMutation.mutate(row.id)
    }
  }

  const onInitializeSubmit = async () => {
    await initializeOrdersMutation.mutate(selectedRows.map(order => order.id))
  }

  return (
    <>
      {transactionHash !== '' && transactionHash !== undefined ? <SuccessAlert txHash={transactionHash} /> : null}
      {error ? <ErrorAlert /> : null}
      <$GridContainer>
        <$GridHeader>
          <Dropdown onDeliveredSubmit={setOrderAsDeliveredAction} onInitializeSubmit={onInitializeSubmit} />
        </$GridHeader>
        <Box
          sx={{
            height: 600,
            padding: '0 20px',
            '& .super-app-theme--header': {
              fontSize: '20px',
            },
          }}
        >
          <DataGrid
            disableDensitySelector
            disableColumnSelector
            disableColumnMenu={true}
            sx={{
              border: 'none',
              width: '100%',
            }}
            rows={parsedOrders}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            checkboxSelection
            selectionModel={selectionModel}
            onSelectionModelChange={e => {
              setSelectionModel(e)
              const selectedIDs = new Set(e)
              const selected = parsedOrders.filter(r => selectedIDs.has(r.id))
              setSelectedRows(selected)
            }}
          />
        </Box>
        {initializeOrdersMutation.isLoading && (
          <$LoaderWrapper>
            <BounceLoader color="#7A27E8" />
          </$LoaderWrapper>
        )}
        {setOrderAsDeliveredMutation.isLoading && (
          <$LoaderWrapper>
            <BounceLoader color="#7A27E8" />
          </$LoaderWrapper>
        )}
      </$GridContainer>
    </>
  )
}
