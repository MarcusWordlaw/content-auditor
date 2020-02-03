Document.destroy_all()
User.destroy_all()
Organization.destroy_all()


IOMAXIS = Organization.create(name: "Consensys")
TECHCANAL = Organization.create(name: "PegaSys")
INGRESSIVE = Organization.create(name: "Kaleido")
User.create!(name: 'Consensys Adminstrator', email: 'admin@consensys.com', password_digest: User.digest('1234'), address: "0x4", admin: true, organization_id: IOMAXIS.id )
