# Step Sorter Js
A javascript rewrite of [elm-step-sorter](https://github.com/ampheul/elm-step-sorter).

## Use
This module is designed for sorting an array step by step, based on manual choices by the user. Check out the example file for how to call this code in your project.

## Demo
A simple demo web app is available to demonstrate what is possible [here](https://ampheul.github.io/elm-step-sorter/). It is programmed in elm, but the concepts are almost identical in javascript.

*Note:* This app works on local upload only. Source code for the demo is available on [elm-step-sorter](https://github.com/ampheul/elm-step-sorter).

## Motivation

The inspiration behind this code came from some discussions with a close friend. We noticed that it is difficult to be objective when rating things. For example, you might rate a good movie as average on a day when you're feeling critical, and an average movie as good the next day. The scores would become inconsistent and they wouldn't really tell you what your favorite movies are. Therefore a better way to rate things could be to rank them relative to one another. We produce this ranking by sorting your list of objects. Comparisons cost users time. In order to minimize cost we use Merge sort, which requires the fewest number of comparisons asymptotically (and practically).