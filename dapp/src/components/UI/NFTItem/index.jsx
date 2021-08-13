// Dependencies
import React, { useCallback, useState } from 'react';
import Loader from 'react-loader-spinner';

// Styled Components
import { Amount, Container, EvolveButton, Image, Item, ItemContent, Title } from './styles';

// API
import API from '../../../api';

function NFTItem({ item, data }) {
  const [currentProgress, setCurrentProgress] = useState(0);

  const getMintedAmount = useCallback((attributes = []) => {
    if (attributes.length) {
      const attr = attributes.find(e => e.trait_type === 'Minted units');
      return attr.value;
    } else {
      return 0;
    }
  }, []);

  const onPayToEvolve = useCallback((data) => {
    if (!currentProgress) {
      API.payToEvolve(data.id, setCurrentProgress).then(() => {
        window.location.reload();
        setCurrentProgress(100);
      }).catch((e) => {
        console.error(e);
      });
    }
  }, []);

  return (
    <Item currentProgress={currentProgress}>
      <Container>
        <ItemContent>
          <Image source={data.image} />
          <Title>{data.name}</Title>
          <Amount>{getMintedAmount(data.attributes)}</Amount>
        </ItemContent>
        <EvolveButton to={`/my-nfts/evolve/${item[0]}`}>
          Evolve
        </EvolveButton>
        <EvolveButton disabled={currentProgress > 0} to={'#'} onClick={() => onPayToEvolve(data)}>
          {currentProgress > 0 ? (
            <Loader
              type="TailSpin"
              color="#fff"
              height={22}
              width={22}
              style={{
                marginRight: '16px'
              }}
            />
          ) : ('Pay to evolve')}
        </EvolveButton>
      </Container>
    </Item>
  );
}

export default NFTItem;
