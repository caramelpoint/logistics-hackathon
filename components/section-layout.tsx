import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { SectionsType } from '../types/section.types'

const $Container = styled.div`
  margin-top: 4rem;
  margin-left: 2rem;
  width: 100%;
  position: relative;
`
const $Title = styled.h1<{ section: SectionsType }>`
  color: ${({ theme }) => theme.palette.colors.wisteria};
  z-index: 1;
  position: ${({ section }) => (section === SectionsType.ORDERS ? 'absolute' : 'none')};
  margin-top: 80px;
  margin-left: 30px;
`

const $SectionContent = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;
`
interface SectionLayoutProps {
  title: string
  children: ReactElement
  section: SectionsType
}
export const SectionLayout = ({ title, children, section }: SectionLayoutProps): ReactElement => {
  return (
    <$Container>
      <$Title section={section}>{title}</$Title>
      <$SectionContent>{children}</$SectionContent>
    </$Container>
  )
}
