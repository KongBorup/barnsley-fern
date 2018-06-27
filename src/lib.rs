fn next_coord(x: f64, y: f64, f: i32) -> Coordinate {
    let mut c = Coordinate {
        x,
        y,
    };

    if      f == 2 { c.f2(); }
    else if f == 3 { c.f3(); }
    else if f == 4 { c.f4(); }
    else           { c.f1(); }

    c
}

#[no_mangle]
pub fn next_x(x: f64, y: f64, f: i32) -> f64 {
    next_coord(x, y, f).x
}

#[no_mangle]
pub fn next_y(x: f64, y: f64, f: i32) -> f64 {
    next_coord(x, y, f).y
}

#[derive(Debug)]
struct Coordinate {
    x: f64,
    y: f64,
}

impl Coordinate {
    pub fn f1(&mut self) {
        self.x = 0.0;
        self.y = 0.16 * self.y;
    }
    
    pub fn f2(&mut self) {
        self.x =  0.85 * self.x + 0.04 * self.y;
        self.y = -0.04 * self.x + 0.85 * self.y + 1.6;
    }

    pub fn f3(&mut self) {
        self.x = 0.2  * self.x - 0.26 * self.y;
        self.y = 0.23 * self.x + 0.22 * self.y + 1.6;
    }

    pub fn f4(&mut self) {
        self.x = -0.15 * self.x + 0.28 * self.y;
        self.y =  0.26 * self.x + 0.24 * self.y + 0.44;
    }
}