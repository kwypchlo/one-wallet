import { Button, Space, Typography } from 'antd'
import WalletAddress from './WalletAddress'
import util, { useWindowDimensions } from '../util'
import React, { useEffect, useState } from 'react'
import Paths from '../constants/paths'
import { useHistory } from 'react-router'
import api from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { walletActions } from '../state/modules/wallet'
const { Title, Text } = Typography

const WalletTitle = ({ address }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const wallets = useSelector(state => state.wallet.wallets)
  const wallet = wallets[address] || {}
  const { isMobile } = useWindowDimensions()
  const [showBuyDomain, setShowBuyDomain] = useState()
  const [domain, setDomain] = useState(wallet.domain)
  const hasDomainName = domain && domain !== ''

  useEffect(() => {
    const f = async () => {
      const lookup = await api.blockchain.domain.reverseLookup({ address })
      setDomain(lookup)
      if (lookup && (wallet.domain !== lookup)) {
        dispatch(walletActions.bindDomain({ address, domain: lookup }))
      }
    }
    f()
  }, [])

  const onPurchaseDomain = () => {
    const oneAddress = util.safeOneAddress(wallet.address)
    history.push(Paths.showAddress(oneAddress, 'domain'))
  }

  return (
    <Space size='large' align='baseline'>
      <Title level={2}>{wallet.name}</Title>
      <Space direction='vertical' size='small' align='start'>
        {hasDomainName && <Text type='secondary' style={{ paddingLeft: 16 }}>{domain}</Text>}
        <WalletAddress
          address={wallet.address}
          onToggle={expanded => setShowBuyDomain(!expanded)}
          shorten={util.shouldShortenAddress({
            walletName: wallet.name,
            isMobile
          })}
        />
      </Space>
      {!hasDomainName && showBuyDomain && (
        <Button type='primary' shape='round' onClick={onPurchaseDomain}>
          Get Domain
        </Button>
      )}
    </Space>
  )
}
export default WalletTitle
