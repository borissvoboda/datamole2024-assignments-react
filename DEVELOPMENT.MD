# 1. Reflecting in retrospect before the Redux

-   I dont know the storybook, heard of it, I tried to do something with it, but it seemed like a totally different thing
-   I think I have used the styled components, but never reflected an extent to which they can be used. Took me a while to figure out that their default export is not here to stay (or is it?)
-   When asking questions, I am perfectly fine to look stupid, but it is not easy to come with the question in the first place (I admit, I don't want to risk asking something hillariously elementary, just for the sake of wasting the other person's time. I also find it silly to But I digress.)

-   ...

# 2. Reflecting the decision to add Redux

At the beginning I have decided not to use some app-wide state management, for it seems that app will be to small for it to make sense.

At about halfway through I have found out that I want to keep the structure of the application (I'm not sure I would come out with the better way without duplicationg code), I have decided it would be less of a mess if I add Redux (and maybe Axios for fetching, to be sure it is done better).

I had a a problem with passing the newTodo state to the list; I see that it is not a good way to use it to trigger the useEffect to update the array of Todos.

I figured out that in order to update the array consistently and less messy, Redux could be the way. Because: I need to update the array in a different components and right now there is starting to be too much of props being passed between the components.

# 3. Adding Redux

-   I find adding it challenging to add Redux by smaller pieces, since it only works... when it works. You can bargain with first adding a static selector and then some reducers.

-   I do not know if atomic comits mean that the thing needs to be functioning in each and every commit (that would make sense)

-   Adding redux (redux toolkit) according to the official documentation.

## 3.1. Main.tsx

I have a added a Provider to the Main.tsx. The Provider wraps the <App> component. I pass the "store" store to the Provider.

## 3.2. redux/store.tsx

I have created a "redux" folder, for the clarity (the official docs would recomend the /app folder and then also creating separate folders for other parts; this could be wise, especially with new functionalities).

In the store, the configureStore function is used to setup the redux store.
The store has reducers defined - the functions that will be the only functions that can mutate the store.
The whole store has a collection of reducers, but we can break them down into slices for better management.

## 3.3. redux/todoSlice

TodosSlice is a part of the store that will contain the array of Todos.
In its first iteration it will only return the array.

TodoSlice itself would have the addTodo reducer

## 3.4. redux/hooks

Following the documentation, I use hooks for selecting (later dispatching). Selecting means the returning the value of particular piece of redux store.

## 3.5. using hooks

I have added useAppSelector to the List component; where the todos state will be mapped.
I have also added this selector to the Footer, where (for the moment) I will return the length of todos. This may change a bit; maybe I should filter NOT DONE todos and done todos and save the count into the store; but it is also possible to filter them in footer and show the count for both.

## 3.6. functionality for adding todos

While there are definitely different ways, or different components that could do a fetch, for now I will use Lists.tsx for fetching; because we already have the infrastructure for that. So on the first render we would use useEffect for fetching and updating
We import reducer "setTodos" from todosSlice.

### 3.6.1. useAppSelector correction

I have corrected useAppSelector, calling selectTodos directly. The first way const todos = useAppSelector((state) => state.todos); if used in different places, would lead to duplicit code and no cetralized way for changing the selector. With the help of ChatGPT I have found out, that the former approach would not memoize the value, it seems.

### 3.6.2. adding single todo to redux

New single todo will be posted and the response (with timestamp) will be added to the beginning of the redux state (the newest one). This way we will update the DB state and the UI state, without the need of fetching the WHOLE array of todos. AND, since the redux state will be updated (copy of a new state is created), this causes the List to rerender and show the new item, without a need of special treatment.
Having the fetching don in the header is not the ideal from the structural/logical perspective, but I will leave it there for now.

# 4. Editing todo

In the ListItem I have added a conditional rendering of a label or Form.
On submit, the ListItem uses PATCH to change label in the API and editTodo in Redux.
I have added a cancel function.
I have added Axios to take care of the fetching.
I have added also the "dynamicLabel" in a hope that it will fix the brief moment after submitting the label change, where you still can see the old label. This didn't work yet, but I will keep it here for a moment.

# 5. Todo COMPLETE toggle

I have added todo complition functionality. By now I am almost sure that the fetching / status changing logic was meant to be all in the List component (or maybe some separate component?). In some sense I agree, the logic should be in one place. On the other hand, editing / completing / deleting(!) somehow fits in the ListItem scope.

# 6. RESTRICTION - PROPS

I have just realized the restriction "Do not modify the API (props) of the provided components."
TODO: For the moment it would be impractical not to pass "id" prop to the ListItem. But if all the filtering is done on the List level, then ID may not be needed in the ListItem.

# 7. Counting todos

Until a bug is found, I consieder it done.

# 8. Creating a custom button

I wasn't sure about the intended desing of all buttons. I guess the exercise was about passing states / maniging the wrapping. Searching for some additional button in redix seems like a waste of time for now, but could be nice.

# 9. Action buttons align

List items, align in static and edit mode. Just realized, that multiple items can be in "edit", which is bad UX.

# 10. Action buttons visibility

Action buttons visibility was don via css and styled components.

# 11. Footer at the bottom

Adding `flex: 1` to the List, meaning it will stretch to the empty place.

# 12. Delete Todo with Redux and Axios in List

Refactoring: Deleting todo now with Redux, Axios and in List (which, I believe, is more in line with the no-props-changing-policy).

# B1 - INSTRUCTIONS UNCLEAR

I couldn't figure out, what means "B1: `List` content - Fix the content alignment of the non-empty `List` component."
