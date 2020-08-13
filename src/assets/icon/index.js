const svgContext = require.context('./icon', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(name => requireContext(name));
requireAll(svgContext);
