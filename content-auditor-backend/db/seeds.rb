Document.destroy_all()
User.destroy_all()
Organization.destroy_all()


Consensys = Organization.create(name: "Consensys")
Pegasys = Organization.create(name: "PegaSys")
Kaleido = Organization.create(name: "Kaleido")
User.create!(name: 'Consensys Adminstrator', email: 'admin@consensys.com', password_digest: User.digest('1234'), address: "0x4", admin: true, organization_id: Consensys.id )
