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
import sb8 from "./sandboxes/8-query.json";

// Assets
const pantheon = require("./assets/pantheon.jpg");

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
    <Slide>
      <FlexBox height="100%" flexDirection="column">
        <Heading margin="0px" fontSize="150px">
          🐊 <i>Drupal State</i> 🐊
        </Heading>
        <Heading margin="0px" fontSize="h2">
          and the Need for a JavaScript SDK
        </Heading>
        <Heading margin="0px 32px" color="primary" fontSize="h3">
          Brian Perry
          <br />
          Florida Drupal Camp - Feb 18, 2022
        </Heading>
      </FlexBox>
    </Slide>
    <MarkdownSlide>
      {`
        # Brian!
        * I'm a Sr. Software Engineer at Pantheon
        * I'm an Initiative coordinator for Drupal's Decoupled Menus Initiative
        * I live in the Chicago suburbs
        * I enjoy Drupal, JavaScript, and Nintendo
        * I recently bought a Ms. Pac-Man machine

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

        🪄 npm install this-must-be-a-solved-problem

        ---

        ## How do other projects handle this?

        - Druxt (Vue) - Custom JSON:API client using Axios, Vuex Store.
        - Next for Drupal (React) - individual helper functions like getResource, fetch, no opinion on state management
        - Other SDK-like libraries - drupal-sdk, drupal-js-sdk, etc.
        - Custom decoupled projects - often roll their own

        ---

        ## What would we need to stop solving this problem repeatedly?

        - Something framework agnostic
        - The ability to use only the utilities your project needs
        - Out of the box state management

        ---

        ## While we're dreaming about solving the world's problems...

        Could interacting with JSON:API be friendlier for JavaScript developers? 🤔

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
        [...]?include=category?fields[recipes]=title,difficulty,instructions,category&fields[categories]=name
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

        ---

        ## How Drupal State Solves These Problems
        - Framework agnostic and universal (server and client)
        - Retrieve an object from Drupal’s API, then serve all future requests for that object from local state.
        - Data is represented in a simplified, deserialized structure requiring less existing JSON:API or Drupal knowledge.
        - Pick and choose individual utility functions like fetchJsonApiEndpoint, translatePath, and fetchToken

      `}
    </MarkdownSlideSet>
    <Slide>
      <Sandbox config={sb5} openPaths={["/index.js"]}></Sandbox>
    </Slide>
    <Slide>
      <Sandbox config={sb6} openPaths={["/index.js"]}></Sandbox>
    </Slide>
    <Slide>Get by path and utility example.</Slide>
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
    <MarkdownSlide>
      {`
        ## Remember Generic Drupal Web Components?
        If data sourcing and state management is a solved problem, we can focus on what makes our Decoupled Drupal project unique.
      `}
    </MarkdownSlide>
    <Slide>Web component client and query example.</Slide>
    <MarkdownSlideSet>
      {`
        ## Where Do We Go From Here?

        How Drupal stands in the wider JavaScript ecosystem: an unscientific survey.

        ---

        ## Various NPM Search Slides
      `}
    </MarkdownSlideSet>
    <MarkdownSlideSet>
      {`
        ## How could we improve this?
        - Better tools under the @drupal namespace
        - Better docs
        - A JS SDK!

        ---

        ## How could we move forward?
        - Promote things to the @drupal namespace

        ---

        ## Sprint Day
        - Get ducks in a row by DrupalCon

        ---

        ## Thanks / Questions

      `}
    </MarkdownSlideSet>
    <Slide
      transition={{
        from: {
          transform: "scale(0.5) rotate(45deg)",
          opacity: 0,
        },
        enter: {
          transform: "scale(1) rotate(0)",
          opacity: 1,
        },
        leave: {
          transform: "scale(0.2) rotate(315deg)",
          opacity: 0,
        },
      }}
      backgroundColor="tertiary"
      backgroundImage="url(https://github.com/FormidableLabs/dogs/blob/main/src/beau.jpg?raw=true)"
      backgroundOpacity={0.5}
    >
      <Heading>Custom Backgrounds</Heading>
      <UnorderedList>
        <ListItem>
          <CodeSpan>backgroundColor</CodeSpan>
        </ListItem>
        <ListItem>
          <CodeSpan>backgroundImage</CodeSpan>
        </ListItem>
        <ListItem>
          <CodeSpan>backgroundOpacity</CodeSpan>
        </ListItem>
        <ListItem>
          <CodeSpan>backgroundSize</CodeSpan>
        </ListItem>
        <ListItem>
          <CodeSpan>backgroundPosition</CodeSpan>
        </ListItem>
        <ListItem>
          <CodeSpan>backgroundRepeat</CodeSpan>
        </ListItem>
      </UnorderedList>
    </Slide>
    <Slide>
      <Heading>Animated Elements</Heading>
      <OrderedList>
        <Appear>
          <ListItem>Elements can animate in!</ListItem>
        </Appear>
        <Appear>
          <ListItem>Out of order</ListItem>
        </Appear>
        <Appear priority={0}>
          <ListItem>
            Just identify the order with the prop <CodeSpan>priority</CodeSpan>!
          </ListItem>
        </Appear>
      </OrderedList>
    </Slide>
    <Slide>
      <FlexBox>
        <Text>These</Text>
        <Text>Text</Text>
        <Text color="secondary">Items</Text>
        <Text fontWeight="bold">Flex</Text>
      </FlexBox>
      <Grid gridTemplateColumns="1fr 2fr" gridColumnGap={15}>
        <Box backgroundColor="primary">
          <Text color="secondary">Single-size Grid Item</Text>
        </Box>
        <Box backgroundColor="secondary">
          <Text>Double-size Grid Item</Text>
        </Box>
      </Grid>
      <Grid
        gridTemplateColumns="1fr 1fr 1fr"
        gridTemplateRows="1fr 1fr 1fr"
        alignItems="center"
        justifyContent="center"
        gridRowGap={1}
      >
        {Array(9)
          .fill("")
          .map((_, index) => (
            <FlexBox paddingTop={0} key={`formidable-logo-${index}`} flex={1}>
              <Image src={formidableLogo} width={100} />
            </FlexBox>
          ))}
      </Grid>
    </Slide>
    <SlideFragments />
    <Slide>
      <CodePane language="jsx">{`
        import { createClient, Provider } from 'urql';

        const client = createClient({ url: 'https://0ufyz.sse.codesandbox.io' });

        const App = () => (
          <Provider value={client}>
            <Todos />
          </Provider>
        );
        `}</CodePane>
      <Box height={20} />
      <CodePane language="java" showLineNumbers={false}>{`
        public class NoLineNumbers {
          public static void main(String[] args) {
            System.out.println("Hello");
          }
        }
        `}</CodePane>
    </Slide>
    <div>
      <Slide>
        <Heading>This is a slide embedded in a div</Heading>
      </Slide>
    </div>
    <MarkdownSlide componentProps={{ color: "yellow" }}>
      {`
        # This is a Markdown Slide

        - You can pass props down to all elements on the slide.
        - Just use the \`componentProps\` prop.
        `}
    </MarkdownSlide>
    <MarkdownSlide animateListItems>
      {`
       # This is also a Markdown Slide

       It uses the \`animateListItems\` prop.

       - Its list items...
       - ...will appear...
       - ...one at a time.
      `}
    </MarkdownSlide>
    <Slide>
      <Grid
        flex={1}
        gridTemplateColumns="50% 50%"
        gridTemplateRows="50% 50%"
        height="100%"
      >
        <FlexBox alignItems="center" justifyContent="center">
          <Heading>This is a 4x4 Grid</Heading>
        </FlexBox>
        <FlexBox alignItems="center" justifyContent="center">
          <Text textAlign="center">
            With all the content aligned and justified center.
          </Text>
        </FlexBox>
        <FlexBox alignItems="center" justifyContent="center">
          <Text textAlign="center">
            It uses Spectacle <CodeSpan>{"<Grid />"}</CodeSpan> and{" "}
            <CodeSpan>{"<FlexBox />"}</CodeSpan> components.
          </Text>
        </FlexBox>
        <FlexBox alignItems="center" justifyContent="center">
          <Box width={200} height={200} backgroundColor="secondary" />
        </FlexBox>
      </Grid>
    </Slide>
    <Slide>
      <FlexBox height="100%">
        <SpectacleLogo size={500} />
      </FlexBox>
      <Notes>
        Spectacle supports notes per slide.
        <ol>
          <li>Notes can now be HTML markup!</li>
          <li>Lists can make it easier to make points.</li>
        </ol>
      </Notes>
    </Slide>
    <MarkdownSlideSet>
      {`
        # This is the first slide of a Markdown Slide Set
        ---
        # This is the second slide of a Markdown Slide Set
        `}
    </MarkdownSlideSet>
  </Deck>
);

ReactDOM.render(<Presentation />, document.getElementById("root"));
