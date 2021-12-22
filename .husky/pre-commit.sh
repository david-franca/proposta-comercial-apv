#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo '🏗️👷 Styling, testing and building your project before committing'

yarn lint-staged

yarn build ||
  (
    echo '❌👷🔨❌ Better call Bob... Because your build failed ❌👷🔨❌
            Next build failed: View the errors above to see why.
    '
    false
  )

# If everything passes... Now we can commit
echo '✅✅✅✅ You win this time... I am committing this now. ✅✅✅✅'
