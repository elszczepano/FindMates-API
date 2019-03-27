import PendingMatch from '../models/PendingMatch';
import Match from '../models/Match';

export default {
	async getAll(req, res) {
		const offset = parseInt(req.query.offset) || 0;
		const perPage = parseInt(req.query.perPage) || 10;
		const count = await PendingMatch.estimatedDocumentCount();
		return PendingMatch.find({}).skip(offset).limit(perPage)
			.populate({
				path: 'user1',
				select: 'name profilePicture'
			})
			.populate({
				path: 'user2',
				select: 'name profilePicture'
			})
			.then(item => {
				if (!item.length || !item) return res.status(404).json({
					success: false,
					message: 'Pending matches not found.'
				});
				res.append('total-count', count);
				res.status(200).json({
					success: true,
					data: item
				});
			})
			.catch(err => res.status(500).json({
				success: false,
				message: err
			}));
	},
	getOne(req, res) {
		return PendingMatch.findById(req.params.id)
			.populate({
				path: 'user1',
				select: 'name profilePicture'
			})
			.populate({
				path: 'user2',
				select: 'name profilePicture'
			})
			.then(item => {
				if (!item) return res.status(404).json({
					success: false,
					message: `Pending match with ID ${req.params.id} not found.`
				});
				if (req.user._id.equals(item.user1._id) || req.user._id.equals(item.user2._id)) {
					res.status(200).json({
						success: true,
						data: item
					});
				} else {
					res.status(403).json({
						success: false,
						message: 'Access denied. User not permitted.'
					});
				}
			})
			.catch(err => res.status(500).json({
				success: false,
				message: err
			}));
	},
	getResourcesOfUser(req, res) {
		return PendingMatch.find({
			$or:
				[
					{'user1': req.params.id},
					{'user2': req.params.id}
				]
		})
			.then(item => {
				if (!item.length || !item) return res.status(404).json({
					success: false,
					message: `Resources of user ID ${req.params.id} not found.`
				});
				if (req.user._id.equals(item.user1._id) || req.user._id.equals(item.user2._id)) {
					res.status(200).json({
						success: true,
						data: item
					});
				} else {
					res.status(403).json({
						success: false,
						message: 'Access denied. User not permitted.'
					});
				}
			})
			.catch(err => res.status(500).json({
				success: false,
				message: err
			}));
	},
	createNew(req, res) {
		const pendingMatch = new PendingMatch(req.body);
		return pendingMatch.save()
			.then(item => res.status(201).json({
				success: true,
				message: 'Pending match created successfully.',
				data: item
			}))
			.catch(err => res.status(500).json({
				success: false,
				message: err
			}));
	},
	updateOne(req, res) {
		return PendingMatch.findById(req.params.id)
			.then(item => {
				if (!item) return res.status(404).json({
					success: false,
					message: `Pending match with ID ${req.params.id} not found.`
				});
				if (req.user._id.equals(item.user1._id) || req.user._id.equals(item.user2._id)) {
					if ((req.user._id.equals(item.user1._id) && req.body.user2Approval) || (req.user._id.equals(item.user2._id) && req.body.user1Approval)) {
						return res.status(403).json({
							success: false,
							message: 'Access denied. User not permitted.'
						});
					}
					const pendingMatch = Object.assign(item, req.body);
					pendingMatch.save()
						.then(item => {
							if (item.user1Approval && item.user2Approval) {
								const newMatch = new Match(pendingMatch);
								newMatch.save();
								item.remove({_id: item._id});
								res.status(200).json({
									success: true,
									message: 'New match created!',
									data: item
								});
							} else {
								res.status(200).json({
									success: true,
									message: 'Pending match updated successfully.',
									data: item
								});
							}
						});
				} else {
					res.status(403).json({
						success: false,
						message: 'Access denied. User not permitted.'
					});
				}
			})
			.catch(err => res.status(500).json({
				success: false,
				message: err
			}));
	},
	deleteOne(req, res) {
		return PendingMatch.findById(req.params.id)
			.then(item => {
				if (!item) return res.status(404).json({
					success: false,
					message: `Pending match with ID ${req.params.id} not found.`
				});
				if (req.user._id.equals(item.user1._id) || req.user._id.equals(item.user2._idd)) {
					item.delete({_id: req.params.id});
					res.status(200).json({
						success: true,
						message: 'Pending match deleted successfully.'
					});
				} else {
					res.status(403).json({
						success: false,
						message: 'Access denied. User not permitted.'
					});
				}
			})
			.catch(err => res.status(500).json({
				success: false,
				message: err
			}));
	}
};
