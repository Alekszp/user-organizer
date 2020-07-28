function ExtractJwt (req){
    let token = null
    if(req.cookies && req.cookies.token !=void(0)){
        token = req.cookies['token']
    }
    return token
}

const jwt = {
    jwtFromRequest: ExtractJwt,
    secretOrKey: 'MEs9Uopp4jon5DTOvDCnSYBK3Dy6wBHounKa25R5yj2LJ0oJB723y8FnL6WQ8lGqBewqxXwuqhaJvXmywEwNTvbXTc7bu3OneagNkmxUlG2eFPNBlw4fOPruybfvKl46bro7-wvtDZjqCH8tMtDNIRm8fAQlSqNE83z5_JRH4KP1w_GNsSppr3JUraWwU64xI4052513egc13eY0waX830GA6yKJULQHwa_pU24J5e2KqNBBZFJIefHy7G6C_ygfiP5Je-fw86yd9iYzAJV8p1kQa12yERnGE1r7ZqNhGcJzYDpkKs9M9HD7Vdm6W6PC6HZFr5qXotK59IVAKY0ZfQ'
}

const expireIn = '1 day'

export {jwt, expireIn}