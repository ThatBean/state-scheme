# state-scheme

Create composable State - Reducer by define them as schemes

## Usage

please check `/example/test.js`

## Contents

```js
export {
  Scheme,
  ObjectScheme,
  ArrayScheme,
  ObjectAs,
  ArrayOf,
  objectActMap,
  arrayActMap,
  Operation
}
```

#### Operation

```js
const Operation = {
  objectSet,
  objectDelete,
  objectMerge,

  arraySet,
  arrayDelete,
  arrayInsert,
  arrayPush,
  arrayUnshift,
  arrayPop,
  arrayShift,
  arrayConcat,
  arrayMatchPush,
  arrayMatchDelete,
  arrayMatchMove,
  arrayFindPush,
  arrayFindDelete,
  arrayFindMove,
  arrayFindSet
}
```
