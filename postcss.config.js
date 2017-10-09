module.exports = {
	plugins: [
		require('postcss-easy-import')({prefix: '_'}), // keep this first
		require('postcss-cssnext')({}),
		require('lost'),
		require('css-mqpacker')({}),
		require('cssnano')({
			autoprefixer: false
		})
	]
}
