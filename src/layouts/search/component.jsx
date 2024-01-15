import { Fragment, useState } from 'react';
import { Form, Input, Button, Descriptions, Image } from 'antd';
import Axios from 'axios';
import { capitalize } from '../common/capitalize';

// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';

const Search = () => {
  const [state, setState] = useState({
    text: '',
    err: '',
    pokemonName: '',
    pokemonSprite: {
      front_default: '',
    },
  });

  const searchPokemonById = async (id, successHandler, errorHandler) => {
    try {
      await Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(async (response) => {
          successHandler(response.data);
        })
        .catch(errorHandler);
    } catch (err) {
      console.log(err);
    }
  };

  const setPokemonHandler = (pokemon) => {
    setState({
      ...state,
      pokemonName: capitalize(pokemon.name),
      pokemonSprite: {
        front_default: pokemon.sprites.front_default,
      },
    });
  };

  const pokemonNameOnChange = (event) => {
    setState({ text: event.target.value });
  };

  const searchPokemonFormOnFinish = async () => {
    const id = state.text;
    const successHandler = (Pokemon) => {
      setState({ err: '' });
      setPokemonHandler(Pokemon);
    };
    const errorHandler = () => {
      setState({ err: 'Pokemon Not Found' });
    };
    await searchPokemonById(id, successHandler, errorHandler);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Enter a Pokemon ID
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
              <Form layout="vertical" onFinish={searchPokemonFormOnFinish}>
              <Form.Item>
                <Input
                  type="number"
                  min={1}
                  max={151}
                  value={state.text}
                  onChange={pokemonNameOnChange}
                  required
                />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Form>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Result
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
              <Descriptions
              bordered
              size="small"
              style={{
                marginLeft: 24,
                marginRight: 24,
                marginBottom: 24 
              }}
              column={{
                xs: 1,
                sm: 1,
                md: 1,
                lg: 1,
              }}
            >
              {!state?.err && (
                <>
                  <Descriptions.Item label="Name">
                    {state.pokemonName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Image">
                    {state.pokemonSprite?.front_default && (
                      <Image width={200} src={state.pokemonSprite?.front_default} />
                    )}
                  </Descriptions.Item>
                </>
              )}
              {state?.err && <Descriptions.Item>{state?.err}</Descriptions.Item>}
            </Descriptions>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default Search;
