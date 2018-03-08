const { CompositeDisposable } = require('atom')
const { spawn } = require('child_process')

const gitBranchesFactory = ({ React, store }) => {
	const loadData = onData => {
		const cwd = atom.project.getPaths()[0]
		const cmdProcess = spawn('git', ['branch'], { cwd })
		cmdProcess.stdout.on('data', data => {
			onData(
				data
					.toString('utf-8')
					.split('\n')
					.filter(s => s.length > 1)
					.map(value => ({ value }))
			)
		})
	}

	const accept = branch => {
		const cwd = atom.project.getPaths()[0]
		const value = branch.value.trim(0)

		if (/^\*/.test(value)) {
			console.log(`Already on ${value.substring(2)}`)
			return
		}

		const cmdProcess = spawn('git', ['checkout', value], { cwd })
		cmdProcess.stdout.on('data', () => {
			store.dispatch({
				type: 'HIDE'
			})
		})
	}

	return { loadData, accept }
}

module.exports = {
	subscriptions: null,

	activate() {
		this.subscriptions = new CompositeDisposable()
	},

	async consumeSparkling(commandFactoryPromise) {
		const commandFactory = await commandFactoryPromise
		const gitBranches = commandFactory(gitBranchesFactory)

		this.subscriptions.add(
			atom.commands.add('atom-workspace', {
				'sparkling-extras:gitBranches': gitBranches
			})
		)
	},

	deactivate() {
		this.disposables = []
		this.subscriptions.dispose()

		this.renameView && this.renameView.destroy()
		this.renameView = null
	},

	serialize() {
		return {}
	}
}
