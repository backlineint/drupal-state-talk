import React from "react";
import ReactDOM from "react-dom";

import {
  FlexBox,
  Heading,
  SpectacleLogo,
  UnorderedList,
  CodeSpan,
  OrderedList,
  ListItem,
  FullScreen,
  Progress,
  Appear,
  Stepper,
  Slide,
  Deck,
  Text,
  Grid,
  Box,
  Image,
  CodePane,
  MarkdownSlide,
  MarkdownSlideSet,
  Notes,
} from "spectacle";

import Sandbox from "./components/Sandbox";

// Sandbox Data
import sb1 from "./sandboxes/1-menu-component.json";
import sb2 from "./sandboxes/2-get-object-fetch.json";
import sb3 from "./sandboxes/3-include-data-fetch.json";
import sb4 from "./sandboxes/4-limit-fields-fetch.json";
import sb5 from "./sandboxes/5-ds-quickstart.json";
import sb6 from "./sandboxes/6-include-data.json";
import sb7 from "./sandboxes/7-by-path.json";
import sb7a from "./sandboxes/7a-path-util.json";
import sb8 from "./sandboxes/8-query.json";
import sb9 from "./sandboxes/9-provider.json";

// Assets
const pantheon = require("./assets/pantheon.jpg");
const npmDrupal = require("./assets/drupal-npm.png");
const npmAtDrupal = require("./assets/@drupal-npm.png");
const wp = require("./assets/wp.png");
const aem = require("./assets/aem.png");
const sitecore = require("./assets/sitecore.png");
const contentful = require("./assets/contentful.png");
const pyramid = require("./assets/pyramid.png");
const title = require("./assets/dc-title.png");

const formidableLogo =
  "https://avatars2.githubusercontent.com/u/5078602?s=280&v=4";

// SPECTACLE_CLI_THEME_START
const theme = {
  fonts: {
    header: '"Open Sans Condensed", Helvetica, Arial, sans-serif',
    text: '"Open Sans Condensed", Helvetica, Arial, sans-serif',
  },
};
// SPECTACLE_CLI_THEME_END

// SPECTACLE_CLI_TEMPLATE_START
const template = () => (
  <FlexBox
    justifyContent="space-between"
    position="absolute"
    bottom={0}
    width={1}
  >
    <Box padding="0 1em">
      <FullScreen />
    </Box>
    <Box padding="1em">
      <Progress />
    </Box>
  </FlexBox>
);
// SPECTACLE_CLI_TEMPLATE_END

const SlideFragments = () => (
  <>
    <Slide>
      <Text>This is a slide fragment.</Text>
    </Slide>
    <Slide>
      <Text>This is also a slide fragment.</Text>
      <Appear>
        <Text>This item shows up!</Text>
      </Appear>
      <Appear>
        <Text>This item also shows up!</Text>
      </Appear>
    </Slide>
  </>
);

const Presentation = () => (
  <Deck theme={theme} template={template}>
    <Slide
      backgroundColor="tertiary"
      backgroundImage={`url(${title.default})`}
    ></Slide>
    <MarkdownSlide>
      {`
        # Brian!
        * I'm a Sr. Software Engineer at Pantheon
        * I'm an Initiative coordinator for Drupal's Decoupled Menus Initiative
        * I live in the Chicago suburbs
        * I enjoy Drupal, JavaScript, and Nintendo
        * I semi-recently bought a Ms. Pac-Man machine

        brianperry.dev, @bricomedy, d.o: brianperry
      `}
    </MarkdownSlide>
    <Slide
      backgroundColor="tertiary"
      backgroundImage="url(https://ok6static.oktacdn.com/fs/bco/7/fs0eurcntlVV4NwN92p7)"
    >
      <Heading margin="0px" fontSize="h2" color="primary">
        Pantheon
      </Heading>
      <Grid gridTemplateColumns="1fr 1fr" gridColumnGap={50}>
        <Box>
          <Text color="primary">
            Pantheon is the WebOps platform where marketers and developers drive
            results, reaching billions globally with Dynamic WordPress and
            Drupal sites. Learn more at Pantheon.io.
          </Text>
        </Box>
      </Grid>
    </Slide>
    <MarkdownSlide>
      {`
        # Our Topic: Drupal State
        A simple data store for managing application state sourced from Drupal
        - Why it was created
        - Why you might use it
        - Why it is important for the future of Drupal
      `}
    </MarkdownSlide>
    <Slide
      backgroundColor="tertiary"
      backgroundImage="url(https://cdn1.epicgames.com/epic/offer/Journey_SmallSize-2580x1450-75345be2b7101291982f1dcfcedaadbd.jpg)"
      backgroundOpacity={0.5}
    >
      <Heading color="primary">But really...</Heading>
      <Heading color="primary" fontSize="h3">
        We're going on a winding journey through Drupal's JavaScript ecosystem.
      </Heading>
    </Slide>
    <Slide>
      <Sandbox config={sb1} openPaths={["/index.html", "/index.js"]} />
    </Slide>
    <Slide>
      <Heading>Fetching Data</Heading>
      <CodePane language="javascript">{`
        connectedCallback() {
          super.connectedCallback();

          if (this.baseUrl && this.menuId) {
            this.fetchData(this.baseUrl, this.menuId);
          }
        }
      `}</CodePane>
      <Text>connectedCallback lifecycle method triggers a fetch...</Text>
    </Slide>
    <Slide>
      <CodePane language="javascript">{`
        fetchData(baseURL, menuID) {
          this.isLoading = true;
          const url = \`\${baseURL}/system/menu/\${menuID}/linkset\`;
          fetch(url, {})
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              this.isLoading = false;
              throw new Error(
                \`Unable to fetch \${url}. \${response.status} \${response.statusText}\`
              );
            })
            .then(json => {
              try {
                const denormalized = denormalize(json, menuID);
                this.tree = denormalized.tree;
              } catch (e) {
                throw new Error('Unable to denormalize menu.');
              }
              this.isLoading = false;
            });
        }
        `}</CodePane>
    </Slide>
    <MarkdownSlideSet>
      {`
        ## This doesn't scale
        Consider a card component.
        - 1 card = 1 fetch
        - 10 cards = 10 fetches
        - 100 cards = you DDOSed yo' self

        ---

        ## My Component Library Needs:
        - Easy methods to source data from Drupal's JSON:API
        - A solution for managing state across multiple components

        ???? npm install this-must-be-a-solved-problem

      `}
    </MarkdownSlideSet>
    <MarkdownSlideSet>
      {`

        ## How do other projects handle this?

        - Druxt (Vue) - Custom JSON:API client using Axios, Vuex Store.
        - Next for Drupal (React) - < v1.3 uses individual helper functions like getResource, fetch. v1.3 introduces DrupalClient. BYO cache implementation.
        - Other SDK-like libraries - drupal-sdk, drupal-js-sdk, etc.
        - Custom decoupled projects - often roll their own

        ---

        ## What would we need to stop solving this problem repeatedly?

        - Something framework agnostic
        - The ability to use only the utilities your project needs
        - Out of the box state management

        ---

        ## While we're dreaming about solving the world's problems...

        Could interacting with JSON:API be friendlier for JavaScript developers? ????

        How about developers who aren't familiar with Drupal or the JSON:API spec?
      `}
    </MarkdownSlideSet>
    <Slide>
      <Sandbox config={sb2} openPaths={["/index.js"]}></Sandbox>
    </Slide>
    <Slide>
      <Sandbox config={sb3} openPaths={["/index.js"]}></Sandbox>
    </Slide>
    <Slide>
      <Heading>Avoiding Over-Fetching</Heading>
      <CodePane language="javascript">{`
        // Will give us all fields on the recipe and the category
        /api/recipes/a542e833-edfe-44a3-a6f1-7358b115af4b?include=category

        // Closer, but still returns all fields for the category
        [...]?include=category&fields[recipes]=title,difficulty,instructions,category

        // Specify fields on category
        [...]?include=category&fields[recipes]=title,difficulty,instructions,category&fields[categories]=name
      `}</CodePane>
      <Text>Side note: drupal-jsonapi-params simplifies this</Text>
    </Slide>
    <Slide>
      <Sandbox config={sb4} openPaths={["/index.js"]}></Sandbox>
    </Slide>
    <MarkdownSlideSet>
      {`
        ## The GraphQL of it All
        - GraphQL is really good at preventing over fetching.
        - The (slightly uninformed) state of GraphQL in Drupal
          - Contributed module
          - graphql v3 vs v4

        `}
    </MarkdownSlideSet>
    <MarkdownSlideSet>
      {`

        ## How Drupal State Solves These Problems
        - Framework agnostic and universal (server and client)
        - Retrieve an object from Drupal???s API, then serve all future requests for that object from local state.
        - Data is represented in a simplified, deserialized structure requiring less existing JSON:API or Drupal knowledge.
        - Pick and choose individual utility functions like fetchJsonApiEndpoint, translatePath, and fetchToken

      `}
    </MarkdownSlideSet>
    <Slide>
      <Sandbox config={sb5} openPaths={["/index.js"]}></Sandbox>
    </Slide>
    {/* <Slide>
      <Sandbox config={sb2} openPaths={["/index.js"]}></Sandbox>
    </Slide> */}
    <Slide>
      <Sandbox config={sb6} openPaths={["/index.js"]}></Sandbox>
    </Slide>
    <Slide>
      <Sandbox config={sb7} openPaths={["/index.js"]}></Sandbox>
    </Slide>
    <Slide>
      <Sandbox config={sb7a} openPaths={["/index.js"]}></Sandbox>
    </Slide>
    <Slide>
      <CodePane language="javascript">{`
import { ServerResponse } from 'http';
import fetchJsonapiEndpoint from './fetchJsonapiEndpoint';
import defaultFetch from './defaultFetch';
import { TJsonApiBody } from 'jsona/lib/JsonaTypes';
import { fetchAdapter } from '../types/types';

const translatePath = async (
  apiUrl: string,
  path: string,
  requestInit = {},
  _res: ServerResponse | boolean = false,
  fetch: fetchAdapter = defaultFetch
): Promise<void | TJsonApiBody> => {
  const response = (await fetchJsonapiEndpoint(
    apiUrl + '?path=' + path + '&_format=json',
    requestInit,
    _res,
    fetch
  )) as TJsonApiBody;
  return response;
};
export default translatePath;
      `}</CodePane>
    </Slide>
    <Slide>
      <Sandbox config={sb8} openPaths={["/index.js"]}></Sandbox>
    </Slide>
    <Slide>
      <Heading>Remember Generic Drupal Web Components?</Heading>
      <CodePane language="javascript">{`
        if (solvedProblem === "data sourcing and state management") {
          const weCanFocusOn = "what makes our Decoupled Drupal project unique";
        }
      `}</CodePane>
    </Slide>
    <Slide>
      <Sandbox config={sb9} openPaths={["/index.html"]}></Sandbox>
    </Slide>
    <MarkdownSlideSet>
      {`
        ## Where Do We Go From Here?

        How Drupal stands in the wider JavaScript ecosystem: an unscientific survey.
      `}
    </MarkdownSlideSet>
    <Slide>
      <Image
        src={npmDrupal.default}
        style={{ width: "auto", height: "100%" }}
      />
    </Slide>
    <Slide>
      <Image
        src={npmAtDrupal.default}
        style={{ width: "auto", height: "100%" }}
      />
    </Slide>
    <Slide>
      <Image src={wp.default} style={{ width: "auto", height: "100%" }} />
    </Slide>
    <Slide>
      <Image src={sitecore.default} style={{ width: "auto", height: "100%" }} />
    </Slide>
    <Slide>
      <Image
        src={contentful.default}
        style={{ width: "auto", height: "100%" }}
      />
    </Slide>
    <MarkdownSlideSet>
      {`
        ## How could we improve this?
        - More tools under the @drupal namespace
        - An official Drupal JavaScript SDK / Client
        - Decoupled Drupal documentation on Drupal.org
        `}
    </MarkdownSlideSet>
    {/* <Slide>
      <Image src={pyramid.default} style={{ width: "auto", height: "100%" }} />
    </Slide> */}
    <MarkdownSlideSet>
      {`

        ## Possible Next Steps
        - Promote existing projects to the @drupal namespace
          - Start with https://www.npmjs.com/package/drupal-jsonapi-params?
        - Develop plan to build new SDK like utilities
          - https://www.drupal.org/project/ideas/issues/3277222
        - Documentation efforts within Decoupled Menus Initiative
          - https://www.drupal.org/project/documentation/issues/3276081

        ---

        ## Contribution @ DrupalCon (and beyond)
        - Issues in [Drupal State queue](https://www.drupal.org/project/issues/drupal_state?categories=All)
        - [Drupal JS Client Ideas queue issue](https://www.drupal.org/project/ideas/issues/3277222)
        - Decoupled Menus Initiative
          - [Core Menu Endpoint Issue](https://www.drupal.org/project/drupal/issues/3227824)
          - [Finalize Documentation](https://www.drupal.org/project/decoupled_menus_initiative/issues/3263181)
        - [GDWC Components](https://www.drupal.org/project/gdwc/issues/3207883)
        - Other ideas? I'll be in general contribution - let's talk!

      `}
    </MarkdownSlideSet>
    <Slide
      backgroundColor="tertiary"
      backgroundImage="url(https://slideplayer.com/slide/269033/1/images/15/Discussion+Time%21.jpg)"
    ></Slide>
  </Deck>
);

ReactDOM.render(<Presentation />, document.getElementById("root"));
